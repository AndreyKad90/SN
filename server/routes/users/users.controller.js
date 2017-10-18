import SER from '../../utils/safe.error.response';
import User from '../../models/user';

export async function registerUser(req, res, next) {
  try {
    if (!req.body.login || !req.body.password) {
      throw new SER('Please provide login and password');
    }

    let existingUser = await User.findOne({
      login: req.body.login
    });

    if (existingUser) {
      throw new SER(`The user ${req.body.login} already exists!`);
    }

    req.body.details = {
      fullName: req.body.fname ? `${req.body.fname} ${req.body.lname || ''}`  : '',
      gender: req.body.gender,
      dob: req.body.dob,
      status: req.body.status,
      address: {
        country: req.body.country,
        city: req.body.city
      }
    };



    let newUser = new User(req.body);
    //invoke the instance method
    await newUser.hashPassword();
    await newUser.save();
    res.json(true);
  } catch (err) {
    next(err);
  }
}

//implement pagination in the future
export async function getUsers(req, res, next) {
  try {
    res.json(await User.find());
  } catch(err) {
    next(err);
  }
}

export function getUser(req, res, next) {
  User.findOne({
    _id: req.params.id
  }).then(user => {
    res.json(user);
  }).catch(next);
}

export function getMe(req, res, next) {
  User.findOne({
    _id: req.user.id
  }).then(me => {
    res.json(me);
  }).catch(next);
}

export function updateUser(req, res) {
  res.json('update user');
}

export function deleteUser(req, res, next) {
  User.remove({
    _id: req.params.id
  }).then(deleted => {
    res.json(deleted);
  }).catch(next);
}
