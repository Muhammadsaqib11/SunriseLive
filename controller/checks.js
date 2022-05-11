const Checks = require("../models/checks");
const WorkOrder = require("../models/workOrder");
const CheckTemplate = require("../models/checkTemplate");
const fs = require("fs");

let count1 = 001;

const checks = {
  generateNewCheck: async (req, res) => {
    // console.log(req.body);
    // Checks.findOne({})
    let count = 0;
    // Checks.aggregate([
    //   { $group: { _id: null, no: { $max: "$checkNumber" } } },
    //   { $project: { _id: 0, no: 1 } },
    // ]).exec(function (err, doc) {
    //   count = doc[0].no;
    //   const workOrderNumber = count + 1;
    // });
    const selectedParts = req.body.selectedParts;
    const partsName = selectedParts.map((item) => item.partName);

    await Checks.findOne({})
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        if (doc !== null) {
          console.log(doc._id);
          count1 = doc.checkNumber;
          count1 = count1 + 1;
        }
        // Checks.findByIdAndUpdate(
        //   { _id: id },
        //   { checkNumber: count1 },
        //   { useFindAndModify: false },
        //   (err, doc) => {
        //     if (!err) {
        //       console.log("updated");
        //     }
        //   }
        // );
        const checks = new Checks({ ...req.body, checkNumber: count1 });
        checks.save((err, doc) => {
          // console.log(doc);
          // let id = doc._id;

          WorkOrder.findOne({ _id: req.body.workOrder }, function (err, wo) {
            if (!err) {
              const partsData = wo.partsData;
              partsData.forEach((element) => {
                if (partsName.includes(element.partName)) {
                  element.orderStatus = "Ordered";
                }
              });
              // console.log("abc");
              wo.partsData = partsData;
              wo.markModified("partsData");
              // console.log(this);
              wo.save();
            }
          });
          Checks.findById(doc._id)
            // .populate("bank", "bankName accountType routingNumber accountNumber")
            // .populate("authorizedUser", "name email phNumber")
            .populate({ path: "workOrder", populate: { path: "vehicle" } })
            .populate({
              path: "checkTemp",
              populate: { path: "bank authorizedUser" },
            })
            .populate("supplier")
            .exec((err, doc) => {
              console.log(doc.checkNumber);

              // let checkNumber = doc.checkTemp.checkNumber;
              // let chechNumberInrement =
              //   parseInt(checkNumber.match(/[a-zA-Z]+|[0-9]+/g)[1]) + 1;

              // let newCheckNumber =
              //   checkNumber.match(/[a-zA-Z]+|[0-9]+/g)[0] + chechNumberInrement;
              // console.log(newCheckNumber);

              // console.log(doc.checkTemp._id);
              // CheckTemplate.findOneAndUpdate(
              //   { _id: doc.checkTemp._id },
              //   { checkNumber: newCheckNumber },
              //   { useFindAndModify: false },
              //   (err, doc) => {
              //     // console.log("updated");
              //   }
              // );

              if (!err) {
                // doc.checkTemp.checkNumber.split()
                // console.log(doc)
                res.json({
                  // status: res.status,
                  checks: doc,
                  // error: null,
                });
              } else {
                res.json({
                  // status: res.status,
                  checks: null,
                  error: err.message,
                });
              }
            });
        });
      });
  },

  generateNewFinanceCheck: async (req, res) => {
    console.log(req.files === null);
    console.log(req.body);
    let data = {};
    let values = "";
    await Checks.findOne({})
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        if (doc !== null) {
          console.log(doc._id);
          count1 = doc.checkNumber;
          count1 = count1 + 1;
        }
        let imagedata = req.files === null ? null : req.files.file.data;
        // console.log(imagedata)
        if (imagedata !== null) {
          let buff = new Buffer.from(imagedata, "base64");

          fs.writeFile(
            "public/uploads/" + req.files.file.name,
            buff,
            function (err) {
              if (err) throw err;
              values = JSON.parse(req.body.values);
              data = { ...values, file: req.files.file.name };
              const checks = new Checks({ ...data, checkNumber: count1 });
              checks.save((err, doc) => {
                if (!err) {
                  res.json({
                    checks: doc,
                  });
                }
              });
            }
          );
        }
        if (imagedata === null) {
          values = JSON.parse(req.body.values);
          data = { ...values, file: "" };

          console.log(values);
          const checks = new Checks({ ...data, checkNumber: count1 });
          checks.save((err, doc) => {
            if (!err) {
              res.json({
                checks: doc,
              });
            }
          });
        }
      });
  },

  getAllGeneratedChecks: (req, res) => {
    // const skip = parseInt(req.query.skip);
    // const limit = parseInt(req.query.limit);
    const type = req.query.type;
    // console.log(req.query.type)
    const order = req.query.order;
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    Checks.countDocuments({ checkType: type }, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });

    Checks.find({ checkType: type })
      .skip(skip)
      .sort({ $natural: -1 })
      .limit(size)
      .populate({ path: "workOrder", populate: { path: "vehicle" } })
      .populate({
        path: "checkTemp",
        populate: { path: "bank authorizedUser location" },
      })
      .populate("supplier")
      .populate("category")
      .exec((err, doc) => {
        // if (err) return res.status(400).send(err);
        // res.send(doc);
        // console.log(doc);
        if (!err) {
          res.json({
            status: res.status,
            checks: doc,
            error: null,
            totalDoc: count,
          });
        } else {
          res.json({
            status: res.status,
            checks: null,
            error: err,
            totalDoc: count,
          });
        }
      });
  },

  getOneGeneratedCheck: (req, res) => {
    Checks.findOne({})
      .populate("bank", "bankName accountType routingNumber accountNumber")
      .populate("authorizedUser", "name email phNumber")
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        if (!err) {
          res.send(doc);
          // console.log(doc)
        }
      });
  },

  getGeneratedCheckById: (req, res) => {
    Checks.findOne({ _id: req.body.id })
      .populate({ path: "workOrder", populate: { path: "vehicle" } })
      .populate("category")
      .populate({
        path: "checkTemp",
        populate: { path: "bank authorizedUser location" },
      })
      .populate("supplier")
      .exec((err, doc) => {
        // console.log(doc);
        res.send(doc);
      });
  },
  
  getGeneratedCheckByCheckType: (req, res) => {
    console.log(req.body);
    Checks.find({
      $and: [{ checkType: req.body.type }, { workOrder: req.body.wId }],
    })
      .populate({ path: "workOrder", populate: { path: "vehicle" } })
      .populate({
        path: "checkTemp",
        populate: { path: "bank authorizedUser location" },
      })
      .populate("supplier")
      .exec((err, doc) => {
        if (!err) {
          res.json({
            status: res.status,
            checks: doc,
            error: null,
          });
        } else {
          res.json({
            status: res.status,
            checks: null,
            error: err,
          });
        }
      });
  },

  // checkStatusVerified: (req, res) => {
  //   // console.log(req.body);
  //   Checks.findByIdAndUpdate(
  //     req.body._id,
  //     { status: req.body.status },
  //     { useFindAndModify: false },
  //     (err, data) => {
  //       if (!err) {
  //         // console.log(data);
  //         res.send("Password Has been updated!!!!!");
  //       }
  //     }
  //   );
  // },
};

module.exports = checks;
