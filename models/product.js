const mongoose = require("../config/config");

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  description: String,
  categories: String,
  variantName: String,
  imageName: String,
  variants: [],
  barcode: String,
  cost: String,
  quantity: String,
  width: String,
  length: String,
  height: String,
  unit: String,
  notes: String,
  weightValue: String,
  weightUnit: String,
  time_tracks: Array,
  sku: String,
  price: String,
  parl: String,
  status: String,
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locations",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
