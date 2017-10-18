import SER from '../../utils/safe.error.response';
import User from '../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

export function login(req, res, next) {
  const {login, password} = req.body;

  //check that neither of the above params is empty
  if (!login || !password) {
    throw new SER('You must provide "login" and "password" params');
  }

  //this variable will be used for signing a JWT
  let user;

  //go to the db and fetch the user. Add the password to our attributes select as we need it here.
  User.findOne({
    login
  }).select('+password').then((_user) => {
    user = _user;
    //if a user is found, compare the hash of our user with the incoming password
    if (user) {
      return bcrypt.compare(password, user.password);
    } else {
      return false;
    }
  }).then((authenticated) => {
    //If true, the user is either not found, or the passwords are incorrect. In either case, show the general message
    if (!authenticated) {
      return SER.reject('Incorrect login or password', 401);
    }

    let token = jwt.sign({id: user._id}, config.jwtSecret, {
      expiresIn: '30d'
    });

    user.lastLogin = new Date();
    user.save();

    res.json({token});
  }).catch(next);
}