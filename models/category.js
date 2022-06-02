const mongoose = require("../config/config");

const categorySchema = new mongoose.Schema({
  categoryName: String,
  categoryDescription: String,
  parentCategory: String,
  categoryImage:String,
  time_tracks: Array
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
