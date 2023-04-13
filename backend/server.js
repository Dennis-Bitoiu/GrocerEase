// Added "type": "module" to package.json
// In order to use ES6 Modules
// IMPORTANT: When importing files, they need to end in .extension (.js)
// This also allows to export files using ES6 modules: export default <name>
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import products from './data/products.js';

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all products route
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product by id
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;

  // Find object with the same 'id' key as the endpoint parameter
  const product = products.find(prod => prod._id == id);

  res.send(product);
});

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode on port ${PORT}`);
});
