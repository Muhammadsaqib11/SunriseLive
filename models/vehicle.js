const mongoose = require("../config/config");

const vehiclesSchema = new mongoose.Schema({
  year: String,
  make: String,
  model: String,
  subModel: String,
  engine: String,
  vehicleMillage: String,
  licensePlate: String,
  VIN: String,
  isOwnedBy: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
  },
  yardName:String,
      yardNumber: String,
      lotNumber: String,
      purchaseDate: Date,
      purchasePrice:String,
      color: String,
      hasKeys: String,
      estRetailValue: String,
      saleTitle: String,
      transmission: String,
      drive: String,
      fuelType: String,
      cylinders: String,
      runsAnddrive: String,
      damageDescription: String,
  status: String,
      time_tracks: Array
});

const Vehicle = mongoose.model("Vehicle", vehiclesSchema);

module.exports = Vehicle;
