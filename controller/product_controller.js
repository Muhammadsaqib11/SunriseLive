const Product = require("../models/product");
const mongoose = require('mongoose')
var XLSX = require('xlsx')
const fs = require('fs')
const path = require('path');
const notes = './public/ex.xlsx';
path.dirname(notes);
path.basename(notes);
path.extname(notes);

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
    delete req.body.variants
    variants.forEach((item,i) => {
      let Data = {...req.body,...item,productName:item.Name}
      console.log(Data);
      const product = new Product(Data);
      product.save((err, user) => {
        if(err) return res.status(400).json({error:true,message:err.message})
        if(i === variants.length-1){

          if (!err) {
            console.log(user);
            res.send([user]);
          }
        }
      });

      
    });
  },

  addProductImage: (req, res) => {

    // console.log("req", req)
    let mdata = req.files === null ? null : req.files.file.data;
    console.log(req.files)
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
            console.log("success")
            res.json({ success: true });
          }
        }
      );
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

  getAllProducts: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;
    let count = 0;

    Product.countDocuments({}, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });

    Product.find()
      // .sort({_id: order})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate(
        "location_id",
        "country address state city "
      )
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({ doc: doc, totalDoc: count });
        // console.log(doc);
      });
  },

  updateProductById: (req, res) => {
    const data = {
      email: req.body.email,
      titleName: req.body.titleName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: `${req.body.titleName} ${req.body.firstName} ${req.body.lastName}`,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      county: req.body.county,
      street: req.body.street,
      zipCode: req.body.zipCode,
      homePhone: req.body.homePhone,
      workPhone: req.body.workPhone,
      cellNumber: req.body.cellNumber,
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
