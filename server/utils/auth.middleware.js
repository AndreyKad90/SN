import jwt from 'jsonwebtoken';
import config from '../config';

const publicRoutes = ['authentication/login', 'users/register', 'locations'];


module.exports = (req, res, next) => {
  if (isPublicRoute(req)) {
    next();
  } else {
    let token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
          res.status(401).end('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).end('Unauthorized');
    }
  }
};

function isPublicRoute(req) {
  for (let i = 0; i < publicRoutes.length; i++) {
    if (req.url.includes(publicRoutes[i])) {
      return true;
    }
  }
  return false;
}
