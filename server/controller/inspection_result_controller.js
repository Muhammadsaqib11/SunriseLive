const mongoose = require("../config/config");

const InspectionResult = require("../models/inspection_results");
const InspectionCategory = require("../models/inspection_categories");
const WorkOrder = require("../models/workOrder");
const fs = require("fs");

const inspection_result_controller = {
  addInspectionResult: (req, res) => {
    const cat = new InspectionResult(req.body);
    // console.log(req.body);
    cat.save(async (err, user) => {
      if (!err) {
        const newparts = await req.body.recomended_parts.filter(
          (item) => item !== false
        );
        WorkOrder.findByIdAndUpdate(
          req.body.wo_id,
          {
            partsData: newparts,
            laborData: req.body.recommended_service,
          },
          (err, doc) => {
            res.send(user);
          }
        ); // console.log(newparts);
      }
    });
  },
  getAllInspectionrResult: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    InspectionResult.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      //   .populate("locations", "country state city zipCode address")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);

        console.log(doc);
      });
  },
  getAllInspectionrResult: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    InspectionResult.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      //   .populate("locations", "country state city zipCode address")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);

        console.log(doc);
      });
  },
  getInspectionrResultById: (req, res) => {
    const id = mongoose.Types.ObjectId(req.query.id);

    // InspectionResult.aggregate([
    //     {$match:{_id:id}},
    //     {$group:{_id:null,data:{$first:"$$ROOT"}}},
    //     {$unwind:"$data.results"},
    //     {$addFields: {
    //         convertedId: { $toObjectId: "$data.results.category_id" }
    //      }},
    //     {
    //         $lookup:
    //           {
    //             from: "inspection_categories",

    //             localField: "convertedId",
    //             foreignField: "_id",
    //             as: "categories"
    //           },

    //      },
    //      {$unwind:"$categories"},
    //     {$group:{_id:'$categories._id',data:{$push:"$$ROOT"}}},

    //     {$project:{data:1,convertedId:1}}
    // ])
    console.log(req.query.id);
    InspectionResult.findOne({ wo_id: req.query.id }).exec((err, doc) => {
      console.log(doc);
      if (doc !== null) {
        let categories = [];
        let catLength = doc.categories.length;
        let count = 0;
        doc.categories.map((id) => {
          InspectionCategory.findOne({ _id: id }).exec((err, cat) => {
            if (err) return res.status(400).send(err);
            count += 1;
            categories.push(cat);
            console.log(categories);
            if (count === catLength) {
              res.json({
                _id: doc._id,
                results: doc.results,
                categories,
              });
            }
          });
        });
      } else {
        res.send([]);
      }
    });
  },
  getInspectionrResultsByWoId: (req, res) => {
    console.log(req.query.id);
    InspectionResult.find({ wo_id: req.query.id }).exec((err, doc) => {
      // console.log(doc);
      if (!err) {
        res.send(doc);
      }
    });
  },
  addInspectionImages: (req, res) => {
    let imagedata = req.files === null ? null : req.files.file.data;
    // console.log(req.files)
    console.log(req.files.file.mimetype.split("/")[1]);
    // // console.log(imagedata)
    if (imagedata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");

      fs.writeFile(
        "public/uploads/" + req.files.file.name + ".png",
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
  },
  updateInspectionResult: (req, res) => {
    // console.log(req.body);
    InspectionResult.findByIdAndUpdate(
      req.body.id,
      {
        results: req.body.results,
      },
      (err, user) => {
        if (!err) {
          res.send(user);
        }
      }
    );
  },
  //   getCustomerVehicles: (req, res) => {
  //     console.log(req.body)
  //     Vehicle.find({customer:req.body.vehicle}, (err, data)=>{
  //       res.send(data)
  //       // console.log(data)
  //     })
  //   },
};

module.exports = inspection_result_controller;
