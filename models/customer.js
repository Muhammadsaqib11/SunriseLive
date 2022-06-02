const mongoose = require("../config/config");

const customersSchema = new mongoose.Schema({
  email: String,
  titleName:String,
  firstName: String,
  lastName: String,
  displayName:String,
  country: String,
  state: String,
  city: String,
  county: String,
  street: String,
  zipCode: String,
  homePhone: String,
  workPhone: String,
  cellNumber: String,
});

const Customer = mongoose.model("Customer", customersSchema);

module.exports = Customer;
