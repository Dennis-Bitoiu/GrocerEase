import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },

  //  Second argument, options of the schema
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categoriesSchema);

export default Category;
