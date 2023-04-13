const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const products = require('./data/products');

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
