const mongoose = require("../config/config");

const check = new mongoose.Schema(
  {
    status: String,
    checkNumber: String,
    amount: Number, 
    amountInWords: String,
    message: String,
    memo: String,
    limit: String,
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Locations" },
    bank: { type: mongoose.Schema.Types.ObjectId, ref: "BankAccount" },
    authorizedUser: { type: mongoose.Schema.Types.ObjectId, ref: "AuthorizedUser" },
  },
  { timestamps: true }
);

const CheckTemplate = mongoose.model("CheckTemplate", check);

module.exports = CheckTemplate;
