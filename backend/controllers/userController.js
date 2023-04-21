import AsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Using an async handler simplifies error handling in route handlers,
// particularly for database calls. It avoids manual try-catch blocks,
// making code more readable and less error-prone.

// @description: Auth user & get token
// @route: POST /api/users/login
// @access: Public (Anyone can access it)
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if an user with this email exists
  // Instead of using email: email, we can use destructurin and pass just email as parameter
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { authUser };
