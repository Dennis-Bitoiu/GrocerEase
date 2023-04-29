import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Using an async handler simplifies error handling in route handlers,
// particularly for database calls. It avoids manual try-catch blocks,
// making code more readable and less error-prone.

// @description: Fetch all products
// @route: GET /api/products
// @access: Public (Anyone can access it)
const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @description: Fetch single product
// @route: GET /api/product/:id
// @access: Public (Anyone can access it)
const getProductById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.send(product);
  } else {
    // If something happened. set the sstatus of the response to 404 and throw an error
    // Which will be caught by the errorHandler handler
    console.log('Not Valid');
    res.status(404);
    throw new Error('Product not found');
  }
});

// @description: Delete a product
// @route: DELETE /api/products/:id
// @access: Private / Admin (User has to be an admin to access this route)
const deleteProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    // If something happened. set the sstatus of the response to 404 and throw an error
    // Which will be caught by the errorHandler handler
    console.log('Not Valid');
    res.status(404);
    throw new Error('Product not found');
  }
});

// @description: Create a product
// @route: POST /api/products
// @access: Private / Admin (User has to be an admin to access this route)
const createProduct = AsyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @description: Update a product
// @route: PUT /api/products/:id
// @access: Private / Admin (User has to be an admin to access this route)
const updateProduct = AsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    // Update the product document
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
