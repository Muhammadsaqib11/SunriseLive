const mongoose = require("../config/config");

const productSchema = new mongoose.Schema({
  ID: { type: String, unique: true},
  ProductName: String,
  productDescription: String,
  ProductCategories: String,
  VariantName: String,
  productimageName: String,
  variants: [],
  Barcode: String,
  CurrentSHMDefaultCost: String,
  CurrentSHMQuantity: String,
  width: String,
  length: String,
  height: String,
  unit: String,
  notes: String,
  weightValue: String,
  weightUnit: String,
  time_tracks: Array,
  SKU: String,
  Price: String,
  parl: String,
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locations",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
