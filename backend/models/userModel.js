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

const User = mongoose.model('User', userSchema);

export default User;
