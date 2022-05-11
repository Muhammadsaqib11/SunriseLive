const mongoose = require("../config/config");

const authorizedIndividual_bankAccount = new mongoose.Schema(
  {
    
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankAccount",
    },
    authorizedIndividual: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuthorizedUser",
      },
  },
  { timestamps: true }
);

const AuthorizedUser_BankAccount  = mongoose.model("AuthorizedUser_BankAccount", authorizedIndividual_bankAccount);

module.exports = AuthorizedUser_BankAccount;
