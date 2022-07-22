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

const OrderPO = {
  // addNewcustomer
  addNewPurchaseOrder: async (req, res) => {
    // console.log(req.body)
    const purchaseOrderNumber = req.body.purchaseOrder.orderNumber;
    const purchaseOrderDate = req.body.purchaseOrder.date;
    const purchaseOrderexpectedDate = req.body.purchaseOrder.expectedDate;
    const purchaseOrderFee = req.body.purchaseOrder.fee;
    const purchaseOrderDiscount = req.body.purchaseOrder.discount;
    const purchaseOrderShipTo = req.body.purchaseOrder.shipTo;
    const purchaseOrderbillTo = req.body.purchaseOrder.billTo;

    const PO = req.body.vendorData;

// get order no.............

let orderNo =await PurchaseOrderNumber.findOne()
if(orderNo){
  let poNumber = orderNo.orderNumber
  console.log("poNumber", poNumber)

  console.log("orderNo", orderNo) 
      const id = nanoid();
      PO.forEach( (item, i) => {
        poNumber=poNumber+1
        console.log("poNumber", poNumber)
        const varID = nanoid();
        let Data = { ...item, 
          vendor_id:item._id, 
          orderNumber: poNumber ,
          date:purchaseOrderDate,
          expectedDate:purchaseOrderexpectedDate,
          fee:purchaseOrderFee,
          discount:purchaseOrderDiscount,
          billTo:purchaseOrderbillTo,
          shipTo:purchaseOrderShipTo,
          status:"Overdue"
         };
         delete Data._id;
          // console.log("Data", Data)
        const PurOrder = new PurchaseOrder(Data);
        PurOrder.save(async (err, user) => {
  
          if (err)
            return res.status(400).json({ error: true, message: err.message });
          if (i === PO.length - 1) {

            if (!err) {
            let a = await  PurchaseOrderNumber.findByIdAndUpdate({_id:orderNo._id},{orderNumber:poNumber},{new:true})
          console.log("Data", a)

              res.send({success:true,user:[user]});
            }
          }
        });
      });
}

  },

  getlastPurchaseOrder:async (req , res)=>{
    await PurchaseOrderNumber.findOne({})
      .exec((err, doc) => {
        console.log("doc", )
        // let orderNumber = doc[0].orderNumber
        if (err) return res.status(400).send(err);
          return res.json({ success: true, doc: doc});
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

module.exports = OrderPO;

