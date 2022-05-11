const mongoose = require("../config/config");

const bankAccountSchema = new mongoose.Schema(
  {
    bankName: String,
    accountType:String,
    routingNumber:String,
    confirmRoutingNumber:String,
    accountNumber:String,
    confirmAccountNumber:String,
  },
  { timestamps: true }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
