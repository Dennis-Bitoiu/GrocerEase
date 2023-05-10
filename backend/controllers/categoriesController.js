import AsyncHandler from 'express-async-handler';
import Category from '../models/categoriesModel.js';

// @description: Get all the categories
// @route: GET /api/categories
// @access: Public (anyonecan access it)
const getCategories = AsyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.json(categories);
  // if (categories) {
  //   res.json(categories);
  // } else {
  //   res.status(404);
  //   throw new Error('User not found');
  // }
});

export { getCategories };
