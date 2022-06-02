const mongoose = require("../config/config");

const inspectionCategoriesSchema = new mongoose.Schema(
  {
    name:String
  },
  { timestamps: true }
);

const inspection_categories = mongoose.model("inspection_categories", inspectionCategoriesSchema);

module.exports = inspection_categories;
