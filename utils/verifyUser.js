import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {

  let accessToken = req.headers['authorization']
 

  if (!accessToken) return next(errorHandler(401, 'Unauthorized'));

  let token = accessToken.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
    req.user = user;
    // res.locals.user = user;
    // res.locals.accessToken = accessToken;
    next();
  });
};
