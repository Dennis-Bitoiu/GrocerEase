import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  // JWT Token is being passed in the header of the request following the 'Bearer' schema.
  // Access headers.authorization key in order to retrieve the token

  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      // Split the token string into an array ['Bearer', 'jwtTokenCodeEncoded']
      const tokenCode = token.split(' ')[1];

      const decodedToken = jwt.verify(tokenCode, process.env.JWT_SECRET);

      // Assigns a user object to the 'user' property of the 'req' object.
      // The user object is obtained by finding in the database a user with the 'id' decoded from the JSON Web Token (JWT).
      // The 'password' field is excluded from the returned user object for security reasons.
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to check if user making the request is an admin
// If the user is not and admin, it returns a 401 Unauthorized error.
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
