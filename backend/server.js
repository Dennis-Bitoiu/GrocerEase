const express = require('express');

const app = express();
const products = require('./data/products');

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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
