const  WooCommerce = require("../controller/Woocommerce");
const AAVehiclesParts = require("../models/aavehicles_parts");
const fs = require("fs");

const logs_utils = require("../utils/logs_utils");



const aaVehiclesParts = {

  addIdentifiedParts: (req, res) => {
    AAVehiclesParts.find({}).exec((err, doc) => {
      if (doc.length === 0) {
        const partNo = 111110;
        const newPart = new AAVehiclesParts({ ...req.body, partNo });
        newPart.save((err, doc) => {
          if (err) return res.status(400).json({ err: err.message });
          res.json({ success: true, data: doc });
        });
      } else {
        // using aggregate to find the max partNo in the collection...
        AAVehiclesParts.aggregate([
          { $group: { _id: null, no: { $max: "$partNo" } } },
          { $project: { _id: 0, no: 1 } },
        ]).exec(function (err, doc) {
          const count = doc[0].no;
          const partNo = count + 1;
          const parts = new AAVehiclesParts({ ...req.body, partNo });
          parts.save((err, doc) => {
            if (err) return res.status(400).json({ err: err.message });
            res.json({ success: true, data: doc });
          });
        });
      }
    });
  },
  
  addIdentifiedPartImages: (req, res) => {
    let imagedata = req.files === null ? null : req.files.file.data;
    // console.log(req.files)
    // console.log(req.files.file.mimetype.split("/")[1]);
    // // console.log(imagedata)
    if (imagedata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");

      fs.writeFile(
        "public/aaParts/" + req.files.file.name + ".png",
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
    if (imagedata === null) {
      res.json({ success: false, message: "no image file to Save" });
    }
  },

  getAAVehiclesPartsById: (req, res) => {
    AAVehiclesParts.find({ vehicle_id: req.query.id })
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, parts: doc });
      });
  },

  getAAVehiclesParts: (req, res) => {
    // console.log(req)
    const keyOne = req.query.keyOne;
    const keyTwo = req.query.keyTwo;
    const keyThree = req.query.keyThree;
    const keyFour = req.query.keyFour;
    AAVehiclesParts.find({
      $or: [
        { status: keyOne },
        { status: keyTwo },
        { status: keyThree },
        { status: keyFour },
      ],
    })
      .populate(
        "vehicle_id",
        "year make model subModel VIN licensePlate status purchasePrice"
      )
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, parts: doc });
      });
  },

  updateAAPartStatus: (req, res) => {
   console.log("req",req.body.status)
    if (req.body._id && req.body.status && req.body.user._id) {
      AAVehiclesParts.findByIdAndUpdate(
        req.body._id,
        { $set: { status: req.body.status } },
        { useFindAndModify: false }
      ).exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        // if (!err && doc) {
        //   logs_utils.createLogs(
        //     req.body.status,
        //     req.body.prevStatus,
        //     req.body.user,
        //     req.body.entity,
        //     req.body.vehicle_id,
        //     req.body._id
        //   );
        // }
        if(req.body.status==="Posted Online"){
          console.log("abcasas",req.body._id)
         const data={
           sku : req.body._id,
           name:req.body.product.name,
           categories: [{
             id: 19
           }],
          }
          WooCommerce.postAsync(`products`, data).then(function(result) {
           if (err) return res.status(400).json({ error: err.message });
           const productData = JSON.parse(result.toJSON().body);
           console.log("data",productData)
           AAVehiclesParts.findByIdAndUpdate(
            req.body._id,
            { $set: { status: req.body.status, wc_id:productData.id } },
            { useFindAndModify: false }
          ).exec((err, doc) => {
            if (err) return res.status(400).json({ error: err.message });
            if (!err && doc) {
              logs_utils.createLogs(
                req.body.status,
                req.body.prevStatus,
                req.body.user,
                req.body.entity,
                req.body.vehicle_id,
                req.body._id
              );
            }
         });
        });
        
       }
        res.json({ success: true, part: doc });
      });
    } else {
      res.json({ error: "Missing Some Values" });
    }
    

  },

  updateAAPartSalePriceById: (req, res) => {
    console.log("req.body", req.body);
    if (req.body._id && req.body.salePrice && req.body.user._id) {
      AAVehiclesParts.findByIdAndUpdate(
        req.body._id,
        { $set: { salePrice: req.body.salePrice } },
        { useFindAndModify: false }
      ).exec((err, doc) => {
        console.log("doclog", doc);
        if (err) return res.status(400).json({ error: err.message });
        
        res.json({ success: true, part: doc });
      });
    } else {
      res.json({ error: "Missing Some Values" });
    }
  },

  updateAAPartImage: (req, res) => {
    AAVehiclesParts.findByIdAndUpdate(
      { _id: req.body._id },
      { $addToSet: { imageName: req.body.imageName } },
      { useFindAndModify: false }
    ).exec((err, doc) => {
      if (err) return res.status(400).json({ error: err.message });
      if (doc) {
        res.json({ success: true });
      }
    });
  },
  updateAAPartCabinet: (req, res) => {
    AAVehiclesParts.findByIdAndUpdate(
      req.body._id,
      { $set: { cabinet_id: req.body.c_id } },
      { useFindAndModify: false }
    ).exec((err, doc) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true, part: doc });
    });
  },

  updateAAPartSubBin: (req, res) => {
    if (req.body._id && req.body.sb_id && req.body.user._id) {
      // console.log(req.body)
      AAVehiclesParts.findByIdAndUpdate(
        req.body._id,
        { $set: { subBin_id: req.body.sb_id, status: "Placement Completed" } },
        { useFindAndModify: false }
      ).exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        // console.log(doc)
        if (!err && doc) {
          logs_utils.createPlacementLogs(
            req.body.user,
            req.body._id,
            req.body.sb_id
          );
        }
        res.json({ success: true, part: doc });
      });
    } else {
      res.json({ error: "Missing Some Values" });
    }
  },

  getAAPartById: (req, res) => {
    AAVehiclesParts.findOne({ _id: req.query._id })
      .populate(
        "vehicle_id",
        "year make model subModel VIN licensePlate purchasePrice"
      )
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, part: doc });
      });
  },
  getAAPartAddressByWCId: (req, res) => {
    console.log("req ", req.query.product_id)
    AAVehiclesParts.findOne({ wc_id: req.query.product_id },)
    .populate({
      path: "subBin_id",
      select: "no",
      populate : {
        path: "bin_id",
        select: "no",
        populate: {
          path: "shelf_id",
          select: "no",
          populate: {
            path: "rack_id",
            select: "no",
            populate: {
              path: "warehouse_id",
              select: "no",
            },
          },
        },
      },
    })
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!doc) return res.status(404).json({ error: "No part found"}) 
        res.json({ success: true, part: doc });
      });
  },

  getAAPartAddressById: (req, res) => {
    console.log("req ", req.query.sku)
    AAVehiclesParts.findOne({ _id: req.query.sku })
    .populate({
      path: "subBin_id",
      select: "no",
      populate : {
        path: "bin_id",
        select: "no",
        populate: {
          path: "shelf_id",
          select: "no",
          populate: {
            path: "rack_id",
            select: "no",
            populate: {
              path: "warehouse_id",
              select: "no",
            },
          },
        },
      },
    })
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, part: doc });
      });
  },

  deleteAAPartById: (req, res) => {
    if (req.body._id) {
      AAVehiclesParts.findByIdAndDelete(req.body._id).exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true });
        if (doc) {
          doc.imageName.map((img) => {
            fs.unlink("public/aaParts/" + img, function (err) {
              if (err && err.code == "ENOENT") {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
              } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
              } else {
                console.info(`removed`);
              }
            });
          });
        } else {
          res.status(400).json({ error: err.message });
        }
      });
    } else {
      res.status(400).json({ error: err.message });
    }
  },
  deleteAAPartImage: async (req, res) => {
    handleDeleteImage(req, res);
  },
  getAAPartsBySubBinId: (req, res) => {
    let toatalDocs = 0;
    AAVehiclesParts.countDocuments(
      { subBin_id: req.query.sb_id },
      function (err, count) {
        toatalDocs = count;
      }
    );
    AAVehiclesParts.find({ subBin_id: req.query.sb_id })
      .populate(
        "vehicle_id",
        "year make model status subModel VIN licensePlate purchasePrice"
      )
      .exec((err, data) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, parts: data, toatalParts: toatalDocs });
      });
  },
};
module.exports = aaVehiclesParts;

const handleDeleteImage = (req, res) => {
  fs.unlink("public/aaParts/" + req.body.name, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
      res
        .status(400)
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
