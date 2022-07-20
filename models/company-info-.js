const mongoose = require("../config/config");

const companyInfosSchema = new mongoose.Schema(
  {
    companyName: String,
    physicalAdress: String,
    phoneNumber: String,
    businessType: String,
    businessLogo: String,
    currency: String,


  },
  { timestamps: true }
);

const CompanyInfo = mongoose.model("CompanyInfo", companyInfosSchema);

module.exports = CompanyInfo;
