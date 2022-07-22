const mongoose = require("../config/config");

const purchaseOrderNumberSchema = new mongoose.Schema(
  {
    orderNumber:Number,
  },
  { timestamps: true }
);

const PurchaseOrderNumber = mongoose.model("PurchaseOrderNumber", purchaseOrderNumberSchema);

module.exports = PurchaseOrderNumber;
