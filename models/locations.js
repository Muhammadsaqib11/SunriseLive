const mongoose = require("../config/config");

const locationsSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  country: String,
  address: String,
  state: String,
  city: String,
  street: String,
  zipCode: String,
});

const Location = mongoose.model("Locations", locationsSchema);

module.exports = Location;
