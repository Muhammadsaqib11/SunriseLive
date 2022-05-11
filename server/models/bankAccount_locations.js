const mongoose = require("../config/config");

const bankAccount_locations = new mongoose.Schema(
  {
    
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankAccount",
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locations",
      },
  },
  { timestamps: true }
);

const BankAccount_Locations  = mongoose.model("BankAccount_Locations", bankAccount_locations);

module.exports = BankAccount_Locations;
