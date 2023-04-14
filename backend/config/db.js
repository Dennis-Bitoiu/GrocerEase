// Database Config File
import mongoose from 'mongoose';

// Running queries with mongoose return a promise
// We'll make the function async and use await to wait for the data
// The reason we didn't go with the Promise syntax is because
// Async-await makes the code easier to read, instead of chaining calls
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB connected: ${conn.connection.host}`.brightCyan.bold.underline
    );
  } catch (error) {
    // Log the error end exit with code 1 (failure)
    console.error(`Error: ${error.message}`.brightRed.bold.underline);
    process.exit(1);
  }
}
export default connectDB;
