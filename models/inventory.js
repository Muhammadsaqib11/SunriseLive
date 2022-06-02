const mongoose = require("../config/config");

const inventorySchema = new mongoose.Schema({
  name: String,
  type: String,
  locations: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locations",
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
