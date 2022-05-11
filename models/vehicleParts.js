const mongoose = require("../config/config");

const vehiclesPartSchema = new mongoose.Schema({
  part: String,
  
  inspection_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inspection_categories",
  },
});

const VehiclePart = mongoose.model("VehiclePart", vehiclesPartSchema);

module.exports = VehiclePart;