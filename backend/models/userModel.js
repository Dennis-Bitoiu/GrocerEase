// User model of the database
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  //  Second argument, options of the schema
  {
    timestamps: true,
  }
);

// Define and create a function for the user schema
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Call 'this.password' on the user that this method was called
  // 'this' represents the object that the function was called on, in this case, an user object that came from the data base
  return await bcrypt.compare(enteredPassword, this.password);
};

// This middleware function is called before saving a user to the database.
//  Its purpose is to hash the user's password for security purposes.
//  If the password has not been modified, the function skips this step.
//  If the password has been modified, the function generates a salt using bcrypt.genSalt()
//  And hashes the password using bcrypt.hash().
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
