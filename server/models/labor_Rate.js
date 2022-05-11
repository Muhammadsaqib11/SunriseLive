const mongoose = require("../config/config");

const labor_RatesSchema = new mongoose.Schema({
  laborRate: String,
  locations: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locations",
  },
});

const Labor_Rate = mongoose.model("Labor_Rate", labor_RatesSchema);

module.exports = Labor_Rate;
