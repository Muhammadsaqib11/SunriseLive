const mongoose = require("../config/config");

const categorySchema = new mongoose.Schema({
  
  name: String,
  description: String,
  parentCategory: String,
  image:String,
  time_tracks: Array
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
