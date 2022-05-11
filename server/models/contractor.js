const mongoose = require("../config/config");

const contractorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  socialSecurityNumber: String,
  reTypeSocialSecurityNumber: String,
  zipCode: String,
  employmentStartDate: String,
});

const Contractor = mongoose.model("Contractor", contractorSchema);

module.exports = Contractor;
