const mongoose = require("../config/config");

const supplierSchema = new mongoose.Schema(
  {
    individualRepresentativeName: String,
    email: String,
    phone: String,
    companyName: String,
    companyEmail: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    notes: String,
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
