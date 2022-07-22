const PurchaseOrder = require("../models/purchaseOrder");
const PurchaseOrderNumber = require("../models/purchaseOrderNumber");

const mongoose = require("mongoose");
var XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const notes = "./public/test.xlsx";
path.dirname(notes);
path.basename(notes);
path.extname(notes);
var { nanoid } = require("nanoid");
const { REFUSED } = require("dns");

const OrderPONumber = {
  // addNewcustomer
  addNewPurchaseOrderNumber: async (req, res) => {
    console.log(req.body)


    const orderNumber = req.body.orderNumber;
      const purchaseOrderNumber = new PurchaseOrderNumber(req.body);
      purchaseOrderNumber.save((err, order) => {
        if(order){
          return res.status(200).json({ error: false,success:true ,  message: "created Successfully" });
        }
        if (err)
          return res.status(400).json({ error: true, message: err.message });

      });
  
  },

  getlastPurchaseOrder:async (req , res)=>{
    await PurchaseOrder.find({}).sort({_id:-1}).limit(1)
      .exec((err, doc) => {
        console.log("doc", )
        let orderNumber = doc[0].orderNumber
        if (err) return res.status(400).send(err);
          return res.json({ success: true, doc: parseInt(orderNumber)+1 });
      }); 
  },

  getAllPurchaseOrders: async (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;
    let count = 0;
    await PurchaseOrder.find()
      .populate("location_id", "country address state city ")
      .populate("vendor_id", "name description")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({ success: true, doc: doc });
      });
  },

  getProductById: async (req, res) => {
    await Product.find({ _id: req.query._id })
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
          return res.json({ success: true, doc: doc });
      });
  },

  updateProductById: (req, res) => {
    console.log("id", req.body)
    const data = {
      name: req.body.name,
      description: req.body.description,
      categories: req.body.category,
      width: req.body.width,
      length: req.body.length,
      height: req.body.height,
      unit: req.body.unit,
      weightValue: req.body.weightValue,
      sku: req.body.variants[0].sku,
      barcode: req.body.variants[0].barcode,
      price: req.body.variants[0].price,
      cost: req.body.variants[0].cost,
      parl: req.body.variants[0].parl,
      quantity: req.body.variants[0].quantity,
      imageName: req.body.imageName,
    };
    console.log("data", data)

    Product.findByIdAndUpdate(req.body._id, data, (err, doc) => {
      if (!err) {
        res.json({ success: true });
      }
    });
  },


};

module.exports = OrderPONumber;

