// Added "type": "module" to package.json
// In order to use ES6 Modules
// IMPORTANT: When importing files, they need to end in .extension (.js)
// This also allows to export files using ES6 modules: export default <name>
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

// Connect to the data base
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running');
});

// Any incoming HTTP requests with the route prefix /api/products will be handled by the productRoutes middleware function
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Define the absolute path of the current directory
// The built in __dirname can't be used with ES modules
const __dirname = path.resolve();
// Serve static files from the '/uploads' directory using Express middleware
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ERROR HANDLER MIDDLEWARES
// notFound will throw an error that will be caught and managed by errorHandler
app.use(notFound);

// If notFound happens or any of the routes throw an error,
// errorHandler will take care of this rendering an appropriate message
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(
    `Server running in ${MODE} mode on port ${PORT}`.cyan.bold.underline
  );
});
