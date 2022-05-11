const mongoose = require("../config/config");

const checks = new mongoose.Schema(
  {
    status: String,
    checkNumber: Number,
    checkType: String,
    amount: Number,
    amountInWords: String,
    message: String,

    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Locations" },
    workOrder: { type: mongoose.Schema.Types.ObjectId, ref: "WorkOrder" },
    checkTemp: { type: mongoose.Schema.Types.ObjectId, ref: "CheckTemplate" },
    category:{type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    companyName:String,
    payee:String,
    file: Object
  },
  { timestamps: true }
);

const Checks = mongoose.model("Checks", checks);

module.exports = Checks;
