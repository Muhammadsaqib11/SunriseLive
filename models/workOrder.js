const mongoose = require("../config/config");

const workOrderSchema = new mongoose.Schema(
  {
    date: Date,
    jobCategory: [],
    serviceDescription: String,
    textColor: String,
    status: String,
    lastStatusDate: Date,
    workOrderNumber: Number,
    millageIn: String,
    laborData: [],
    partsData: [],
    removedService: [],
    removedPart: [],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    workOrderType: String,
    remoteLocation: {},
    inventoryVehicleId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Inventories"
    } ,
    inventoryToolboxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Inventories"
    },
    laborTotal: String,
    laborTotalWithTax: String,
    partsTotal: String,
    partsTotalWithTax: String,
    workOrderTotal: String,
    millageOut: String,
    mechanicStatus: String,
  },
  { timestamps: true }
);

const WorkOrder = mongoose.model("WorkOrder", workOrderSchema);

module.exports = WorkOrder;
