import User from '../../models/user';
import FriendRequest from '../../models/friendRequest';
import SER from '../../utils/safe.error.response';
import * as _ from 'lodash';

export function searchNewFriends(req, res, next) {
  let query = {
    'details.fullname': req.query.fullname
  };

  _.forOwn(query, (value, key) => {
    if (!value) {
      delete(query[key]);
    }
  });

  User.find(query).then(users => {
    res.json(users);
  }).catch(next);
}

export function getFriends(req, res, next) {
  User.findOne({
    _id: req.user.id
  }).then(user => {
    return User.find({
      _id: {
        $in: user.friends
      }
    }).select('-friends')
  }).then(friends => {
    res.json(friends);
  }).catch(next);
}

export function getRequestsSentToMe(req, res, next) {
  FriendRequest.find({
    sentTo: req.user.id
  }).then(requests => {
    res.json(requests);
  }).catch(next);
}

export function sendFriendRequest(req, res, next) {
  const requestQuery = {
    initBy: req.user.id,
    sentTo: req.body.userId
  };

  //Check that a user is not on the list of friends
  User.findOne({
    _id: requestQuery.initBy,
    friends: [requestQuery.sentTo]
  }).then(user => {
    if (user) {
      return SER.reject('The friend is already in your list');
    }

    //If the user is not a friend, check if a request to that user has already been sent
    return FriendRequest.findOne(requestQuery);
  }).then((requestExists) => {
    if (requestExists) {
      return SER.reject('The request has already been sent');
    }

    //Finally, generate a request
    return FriendRequest.create(requestQuery);
  }).then(() => {
    res.json("The request has been sent!");
  }).catch(next);
}

export function acceptFriendRequest(req, res, next) {
  if (!req.body.userId) {
    throw new SER('You must provide "userId" param');
  }

  let friendReq;
  FriendRequest.findOne({
    initBy: req.body.userId,
    sentTo: req.user.id
  }).then((_friendReq) => {
    friendReq = _friendReq;
    if (!friendReq) {
      return SER.reject('There is no such a friend request');
    }

    return Promise.all([
      // add the initiator to the accepting user's friends array
      User.update({
        _id: req.user.id
      }, {
        $addToSet: {
          friends: req.body.userId
        }
      }),

      // add the accepting user to the initiator's friends array
      User.update({
        _id: req.body.userId
      }, {
        $addToSet: {
          friends: req.user.id
        }
      })
    ]);
  }).then(() => {
    //clear the friend request from the db
    return friendReq.remove();
  }).then(() => {
    res.json(true);
  }).catch(next);
}

export function removeFromFriends(req, res, next) {
  if (!req.body.userId) {
    throw new SER('You must provide "userId" param');
  }

  Promise.all([
    User.update({
      _id: req.user.id
    }, {
      $pull: {
        friends: req.body.userId
      }
    }),
    User.update({
      _id: req.body.userId
    }, {
      $pull: {
        friends: req.user.id
      }
    })
  ]).then(() => {
    res.json(true);
  }).catch(next);
}