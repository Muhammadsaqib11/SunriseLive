const mongoose = require("../config/config");

const productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productimageName:String,
    productCategoty: String,
    variants: [],
    width: String,
    length: String,
    height: String,
    unit: String,
    notes: String,
    weightValue: String,
    weightUnit: String,
    time_tracks: Array,
    Sku:String,
    Barcode:String,
    Price:String,
    Cost:String,
    parl:String,
    recordQty:String,
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locations",
      },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
