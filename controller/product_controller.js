const Product = require("../models/product");
const mongoose = require("mongoose");
var XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const notes = "./public/test.xlsx";
path.dirname(notes);
path.basename(notes);
path.extname(notes);
var { nanoid } = require("nanoid");

const product = {
  // addNewcustomer
  addNewProduct: (req, res) => {
    // console.log(req.body)
    const variants = req.body.variants;
    // delete req.body.variants;
    const id = nanoid();
    variants.forEach((item, i) => {
      const varID = nanoid();
      let Data = { ...req.body, ...item, name: item.name, id: varID };
      console.log("Data", Data)
      const product = new Product(Data);
      product.save((err, user) => {
        if (err)
          return res.status(400).json({ error: true, message: err.message });
        if (i === variants.length - 1) {
          if (!err) {
            res.send({success:true,user:[user]});
          }
        }
      });
    });
  },
  AssignVendorToProduct: (req, res) => {
    const Vendors = req.body;
    console.log(Vendors)

    Vendors.forEach((item, i) => {
      Product.findByIdAndUpdate(
        item._id,
        { vendor_id: item.vendor_id },
        (err, doc) => {
          if (err)
            return res.status(400).json({ error: true, message: err.message });
          if (i === Vendors.length - 1) {
            if (!err) {
              res.json({
                success: true,
                message: " Assign Vandor Successfully",
              });
            }
          }
        }
      );
    });
  },

  UpdateProductQuantity: (req, res) => {
    const updatedCost = req.body.updateProduct;
    updatedCost.forEach((item, i) => {
      Product.findByIdAndUpdate(
        item._id,
        { quantity: item.quantity },
        (err, doc) => {
          if (err)
            return res.status(400).json({ error: true, message: err.message });
          if (i === updatedCost.length - 1) {
            if (!err) {
              res.json({
                success: true,
                message: " Update Quantity Successfully",
              });
            }
          }
        }
      );
    });
  },

  getProductByBarcode: (req, res)=>{
    console.log(req.query)
    const barcode = req.query.barcode;
    Product.findOne({barcode: barcode})
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(doc)    
      });
  },

  AddProductQuantity: (req, res) => {
    const AddedQuantity = req.body.addProductQuantity;

    AddedQuantity.forEach((item, i) => {
      Product.findByIdAndUpdate(
        item._id,
        { quantity: item.quantity },
        (err, doc) => {
          if (err)
            return res.status(400).json({ error: true, message: err.message });
          if (i === AddedQuantity.length - 1) {
            if (!err) {
              res.json({
                success: true,
                message: " Added Quantity Successfully",
              });
            }
          }
        }
      );
    });
  },

  AppMiddleWareCheck: (req, res) => {
    res.status(200).json("Welcome 🙌 ");
  },

  addProductImage: (req, res) => {
    let mdata = req.files === null ? null : req.files.file.data;
    if (mdata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");
      fs.writeFile(
        `public/product/${req.files.file.name}`,
        buff,
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ success: true });
          }
        }
      );
    }
    if (mdata === null) {
      res.json({ success: false, message: "no image file to Save" });
    }
  },

  deleteProductImage: async (req, res) => {
    handleDeleteImage(req, res);
  },

  bulkUpload: (req, res) => {
    let mdata = req.files === null ? null : req.files.file.data;
    if (mdata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");

      fs.writeFile(`public/test.xlsx`, buff, function (err) {
        if (err) {
          res.send(err);
        } else {
          var workbook = XLSX.readFile(notes);
          var sheet_name_list = workbook.SheetNames;
          var xlData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
          );
          console.log(xlData);

          Product.insertMany(xlData, { ordered: false, upsert: true }).catch(
            (err) => {
              console.error(err);
            }
          );
          res.json({ success: true });
        }
      });
    }
    if (mdata === null) {
      res.json({ success: false, message: "no image file to Save" });
    }
  },

  getProduct: (req, res) => {
    console.log(req.body);
    const data = req.body.data;

    Product.find(
      {
        $or: [
          { firstName: data },
          { lastName: data },
          { cellNumber: data },
          { city: data },
          { email: data },
          { zipCode: data },
        ],
      },
      (err, data) => {
        if (data.length > 0) {
          res.json({
            success: true,
            data,
          });
        } else {
          res.json({ message: "No data found" });
        }
      }
    );
  },

  getAllProducts: async (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;
    let count = 0;

    await Product.countDocuments({status: "active"}, function (err, docCount) {
      if (err) {
       res.status(400).send(err)
      } //handle possible errors
      // console.log("docCount", docCount);
      count = docCount;
    });

    await Product.find({ status: "active" })
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate("location_id", "country address state city ")
      .populate("vendor_id", "name description")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({ success: true, doc: doc, totalDoc: count });
      });
  },

  getVariantsByProductID: async (req, res) => {
    console.log(req.query)
    await Product.find({ parantCode: req.query.parantCode })  
    .populate("vendor_id", "name description")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({ success: true, doc: doc });
      });
  },


  getVendorByProductID: async (req, res) => {
    // console.log(req.body)
    await Product.find({ _id: req.body._id })  
    .populate("vendor_id", "name description")
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

  deleteProduct: async (req, res) => {
    let ids = req.body.ids;
    let status = "archive";

    Product.updateMany(
      { _id: { $in: ids } },
      { $set: { status } },
      { multi: true },
      function (err, records) {
        if (err) {
          return false;
        }
        res.json({ success: true });
      }
    );
  },
};

module.exports = product;

const handleDeleteImage = (req, res) => {

  fs.unlink("public/product/" + req.body.name, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
      res
        .status(404)
        .json({ err: err, message: "File doesn't exist, won't remove it." });
      } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
      res.json({
        err: err,
        message: "Error occurred while trying to remove file",
      });
    } else {
      console.info(`removed`);
      res.json({ err: false, success: true, message: "Success" });
    }
  });
};