const mongoose = require("../config/config");

const companyInfosSchema = new mongoose.Schema(
  {
    companyName: String,
    physicalAdressState: String,
    physicalAddressCity: String,
    physicalAddressStreet: String,
    physicalAddressStreet2: String,
    physicalAddressZipCode: String,
    billingAdressState: String,
    billingAddressCity: String,
    billingAddressStreet: String,
    billingAddressStreet2: String,
    billingAddressZipCode: String,
  },
  { timestamps: true }
);

const CompanyInfo = mongoose.model("CompanyInfo", companyInfosSchema);

module.exports = CompanyInfo;
