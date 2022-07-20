const mongoose = require("../config/config");

const purchaseOrderSchema = new mongoose.Schema(
  {
    date: Date,
    expectedDate: Date,
    status:String,
    orderNumber:String,
    freight:String,
    discount:String,
    fee:String,
    status:String,
    shipTo:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locations",
  },
    billTo:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locations",
  },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },  
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyInfo",
      },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locations",
    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
    },
    products: [],
  },
  { timestamps: true }
);

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

module.exports = PurchaseOrder;
