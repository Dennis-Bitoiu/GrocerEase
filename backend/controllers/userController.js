import AsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
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
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @description: Get user profile
// @route: POST /api/users/profile
// @access: Private (only a logged in user can access it)
const getUserProfile = AsyncHandler(async (req, res) => {
  // req.user property was set in the authMiddleware.js
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description: Update the user profile
// @route: PUT /api/users/profile
// @access: Private (only a logged in user can access it)
const updateUserProfile = AsyncHandler(async (req, res) => {
  // req.user property was set in the authMiddleware.js
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description: Register a new user
// @route: POST /api/users
// @access: Public (Anyone can access it)
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if an user with this email exists
  // Instead of using email: email, use destructuring and pass just email as parameter
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // User.create() is being used instead of user.save() in order to
  // Store a new user entry in the database
  // A middleware inside userModel.js is used to hash the password before the document is saved in the DB
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @description: Get all users
// @route: GET /api/users
// @access: Private/Admin (only a logged in user with a privillege of admin can access it)
const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @description: Delete an user whoose id equals req.params.id
// @route: DELETE /api/users/:id
// @access: Private/Admin (only a logged in user with a privillege of admin can access it)
const deleteUser = AsyncHandler(async (req, res) => {
  // req.user property was set in the authMiddleware.js
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.json('User removed');
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description: Get a user by its ID
// @route: GET /api/users/:id
// @access: Private/Admin (only a logged in user with a privillege of admin can access it)
const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description: Update user
// @route: put /api/users/:id
// @access: Private/Admin (only a logged in user with a privillege of admin can access it)
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
