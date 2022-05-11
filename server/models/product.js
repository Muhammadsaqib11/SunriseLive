const mongoose = require("../config/config");

const productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productimageName:[],
    productCategoty: String,
    variants: [],
    width: String,
    length: String,
    height: String,
    unit: String,
    notes: String,
    weightValue: String,
    weightUnit: String,
    time_tracks: Array
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
