const mongoose = require("../config/config");

const partPriceManagersSchema = new mongoose.Schema({
  maxPartPrice: String,
  minPartPrice: String,
  partPercentage: Number,
});

const PartPriceManager = mongoose.model(
  "PartPriceManager",
  partPriceManagersSchema
);

module.exports = PartPriceManager;
