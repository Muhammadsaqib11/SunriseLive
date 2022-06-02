const Product = require("../models/product");
const mongoose = require("mongoose");
var XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const notes = "./public/test.xlsx";
path.dirname(notes);
path.basename(notes);
path.extname(notes);
const auth = require('../middleware/auth')
var { nanoid } = require("nanoid");


// var workbook = XLSX.readFile(notes);
// var sheet_name_list = workbook.SheetNames;
// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// console.log(xlData);

// Product.insertMany(xlData)

const product = {
  // addNewcustomer
  addNewProduct: (req, res) => {
    // const displayName = `${req.body.titleName} ${req.body.firstName} ${req.body.lastName}`;
    // console.log("req", req.body)
    const variants = req.body.variants;
    delete req.body.variants;
    const ID = nanoid()
    console.log(ID)

    variants.forEach((item, i) => {
      let Data = { ...req.body, ...item, productName: item.Name , ID:ID };
      console.log(Data);
      const product = new Product(Data);
      product.save((err, user) => {
        if (err)
          return res.status(400).json({ error: true, message: err.message });
        if (i === variants.length - 1) {
          if (!err) {
            // console.log(user);
            res.send([user]);
          }
        }
      });
    });
  },

  UpdateProductQuantity: (req, res) => {
    const updatedCost = req.body.updateProduct;
    console.log(updatedCost)
    updatedCost.forEach((item, i) => {
      Product.findByIdAndUpdate(item._id, { CurrentSHMQuantity: item.quantity }, (err, doc) => {
        if (err)
            return res.status(400).json({ error: true, message: err.message });
      if (i === updatedCost.length - 1) {
        if (!err) {
          res.json({ success: true, message:" Update Quantity Successfully" });
        }
      }
      });
    });
  },
  AddProductQuantity: (req, res) => {
    const AddedQuantity = req.body.addProductQuantity;
    console.log(AddedQuantity)
    AddedQuantity.forEach((item, i) => {
      Product.findByIdAndUpdate(item._id, { CurrentSHMQuantity: item.quantity }, (err, doc) => {
        if (err)
            return res.status(400).json({ error: true, message: err.message });
      if (i === AddedQuantity.length - 1) {
        if (!err) {
          res.json({ success: true, message:" Added Quantity Successfully" });
        }
      }
      });
    });
  },


  AppMiddleWareCheck: (req, res ) => {
      res.status(200).json("Welcome 🙌 ");
  },


  addProductImage: (req, res) => {
    // console.log("req", req)
    let mdata = req.files === null ? null : req.files.file.data;
    console.log(req.files);
    console.log(req.files.file.mimetype.split("/")[1]);
    // console.log(mdata)
    if (mdata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");

      fs.writeFile(
        `public/product/${req.files.file.name}`,
        buff,
        function (err) {
          if (err) {
            res.send(err);
          } else {
            console.log("success");
            res.json({ success: true });
          }
        }
      );
    }
    if (mdata === null) {
      res.json({ success: false, message: "no image file to Save" });
    }
  },

  bulkUpload: (req, res) => {
    // console.log("req", req)
    let mdata = req.files === null ? null : req.files.file.data;
    console.log(req.files);
    console.log(req.files.file.mimetype.split("/")[1]);
    // console.log(mdata)
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

          console.log("success");
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
        console.log(data);
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
    // console.log(req)
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);

    const skip = size * pageNo;
    // console.log("size", size, skip)
    let count = 0;

    await Product.countDocuments({}, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      // console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });

    await Product.find()
      // .sort({_id: order})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate("location_id", "country address state city ")
      .exec((err, doc) => {
        console.log("doc", count);
        if (err) return res.status(400).send(err);
        res.json({ success: true, doc: doc, totalDoc: count });
        // console.log(doc);
      });
  },
  updateProductById: (req, res) => {
    console.log("req body", req.body);

    const data = {
      ProductName: req.body.ProductName,
      productDescription: req.body.productDescription,
      category: req.body.category,
      width: req.body.width,
      length: req.body.length,
      height: req.body.height,
      unit: req.body.unit,
      weightValue: req.body.weightValue,
      SKU: req.body.variants[0].SKU,
      Barcode: req.body.variants[0].Barcode,
      Price: req.body.variants[0].Price,
      CurrentSHMDefaultCost: req.body.variants[0].CurrentSHMDefaultCost,
      parl: req.body.variants[0].parl,
      CurrentSHMQuantity: req.body.variants[0].CurrentSHMQuantity,
      productimageName: req.body.productimageName,
    };
    Product.findByIdAndUpdate(req.body._id, data, (err, doc) => {
      if (!err) {
        // console.log(user);

        res.json({ success: true });
      }
    });
  },


};

module.exports = product;
