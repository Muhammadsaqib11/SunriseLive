const mongoose = require("../config/config");
const WorkOrder = require("../models/workOrder");
const Schedule = require("../models/schedule");
const Vehicle = require("../models/vehicle");

const workOrder = {

  addNewWorkOrder: (req, res) => {
    const job = req.body.jobCategory;
    const sd_id = req.body.scheduleId;
    const hours = 1;
    let data = {};
    const laborData = [];
    job.map((job) => {
      data = {
        serviceType: job,
        hours: hours,
        rate: "",
        jobDescription: "",
        jobStatus: "Recommended",
        laborTotal: "",
        approvedDate: "",
      };
      laborData.push(data);
    });

    WorkOrder.find({}).exec((err, wo) => {
      // console.log(wo)
      if (wo.length === 0) {
        const workOrderNumber = 1001;
        const workOrder = new WorkOrder({
          ...req.body,
          laborData,
          workOrderNumber,
        });
        console.log(workOrder);
        workOrder.save((err, user) => {
          if (!err) {
            res.json({
              success: true,
              user,
            });
            scheduleStatusUpdate(sd_id);
          }
        });
      } else {
        WorkOrder.aggregate([
          { $group: { _id: null, no: { $max: "$workOrderNumber" } } },
          { $project: { _id: 0, no: 1 } },
        ]).exec(function (err, doc) {
          const count = doc[0].no;
          const workOrderNumber = count + 1;
          //deleting the id's to avoid the erroe
          if (
            req.body.workOrderType === "On Premises" ||
            req.body.workOrderType === ""
          ) {
            delete req.body.inventoryVehicleId;
            delete req.body.inventoryToolboxId;
          }
          // const inventoryToolboxId = mongoose.Types.ObjectId(req.body.inventoryToolboxId||0)
          // const inventoryVehicleId = mongoose.Types.ObjectId(req.body.inventoryVehicleId||0)
          // console.log(newobj)
          const workOrder = new WorkOrder({
            ...req.body,
            laborData,
            workOrderNumber,
            // inventoryToolboxId,
            // inventoryVehicleId,
          });
          workOrder.save((err, user) => {
            if (!err) {
              res.json({
                success: true,
                user,
              });
              console.log(user);
              scheduleStatusUpdate(sd_id);
            }
            if (err) {
              console.log(err);
            }
          });
        });
      }
    });
  },

  fetchWorkOrderbyMechanicID: (req, res) => {
    WorkOrder.find({ employee: req.body._id })
      .populate(
        "customer",
        "firstName lastName email country state city county street zipCode homePhone workPhone cellNumber"
      )
      .populate("vehicle")
      .populate("employee", "firstName lastName")
      .populate({
        path: "user",
        select: "email firstName lastName",
        populate: {
          path: "locations",
          select:
            "email phoneNumber country address state city street zipCode ",
        },
      })
      .exec((err, doc) => {
        if (!err) {
          res.send(doc);
        }
      });
  },

  updateWorkOrderJobCategory: (req, res) => {
    console.log(req.body);
    const job = req.body.job;
    const hours = 1;
    let data = {};
    const newlaborData = [];
    job.map((job) => {
      data = {
        serviceType: job,
        hours: hours,
        rate: "",
        jobDescription: "",
        jobStatus: "Recommended",
        laborTotal: "",
      };
      newlaborData.push(data);
    });
    WorkOrder.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { laborData: newlaborData } },
      (err, user) => {
        if (!err) {
          // console.log(user);

          res.send(user);
        }
      }
    );
  },

  updateWorkOrder: (req, res) => {
    console.log(req.body);
    WorkOrder.findByIdAndUpdate(
      req.body.id,
      {
        laborData: req.body.lbrData,
        partsData: req.body.prtData,
        laborTotal: req.body.laborTotal,
        partsTotal: req.body.partsTotal,
        laborTotalWithTax: req.body.laborTax,
        partsTotalWithTax: req.body.partsTax,
        workOrderTotal: req.body.workOrderTotal,
        status: req.body.status,
        millageIn: req.body.millageIn,
        millageOut: req.body.millageOut,
      },
      (err, user) => {
        if (!err) {
          // console.log(user);

          res.send(user);
        }
      }
    );
  },

  // updateWorkOrderServicesAndParts: (req, res) => {
  //   console.log(req.body);
  //   WorkOrder.findByIdAndUpdate(
  //     req.body.id,
  //     {
  //       laborData: req.body.lbrData,
  //       partsData: req.body.prtData,
  //     },
  //     (err, user) => {
  //       if (!err) {
  //         // console.log(user);

  //         res.send(user);
  //       }
  //     }
  //   );
  // },

  updateWorkOrderMillage: (req, res) => {
    console.log(req.body);
    WorkOrder.findByIdAndUpdate(
      req.body.id,
      {
        millageIn: req.body.millageIn,
        millageOut: req.body.millageOut,
        laborData: req.body.lbrData,
        partsData: req.body.prtData,
      },
      (err, user) => {
        if (!err) {
          res.send(user);
        }
      }
    );
  },

  deleteWorkOrderService: (req, res) => {
    console.log(req.body);
    WorkOrder.findByIdAndUpdate(
      req.body.id,
      {
        laborData: req.body.lbrData,
        removedService: req.body.deletedService,
        laborTotal: req.body.laborTotal,
        laborTotalWithTax: req.body.laborTax,
        // partsData: req.body.prtData,
        // partsTotal: req.body.partsTotal,
        laborTotalWithTax: req.body.laborTax,
        // partsTotalWithTax: req.body.partsTax,
        workOrderTotal: req.body.workOrderTotal,
      },
      (err, user) => {
        if (!err) {
          // console.log(user);

          res.send(user);
        }
      }
    );
  },

  searchWorkOrderByLicensePlateNumber: (req, res) => {
    // console.log(req.body.licensePlate);
    Vehicle.findOne({ licensePlate: req.body.licensePlate }).exec(
      (err, doc) => {
        if (doc !== null) {
          console.log(doc);
          // console.log(doc._id);
          WorkOrder.findOne({ vehicle: doc._id }).exec((err, data) => {
            console.log(data);
            if (data !== null) {
              res.send(data._id);
            } else {
              res.send("no data available");
            }
          });
        } else {
          console.log("no data available");
          res.send("no data available");
        }
      }
    );
  },

  assignedMechanic: (req, res) => {
    WorkOrder.findOneAndUpdate(
      { _id: req.body._id },
      { employee: req.body.employee_id, mechanicStatus: "assigned" },
      (err, doc) => {
        res.send("mechanic is assigned");
      }
    );
  },

  deleteWorkOrderPart: (req, res) => {
    console.log(req.body);
    WorkOrder.findByIdAndUpdate(
      req.body.id,
      {
        partsData: req.body.prtData,
        removedPart: req.body.deletedPart,
        partsTotal: req.body.partsTotal,
        partsTotalWithTax: req.body.partsTax,
        workOrderTotal: req.body.workOrderTotal,
      },
      (err, wo) => {
        if (!err) {
          // console.log(user);

          res.send(wo);
        }
      }
    );
  },

  getAllWorkOrder: (req, res) => {
    // const skip = parseInt(req.query.skip);
    // const limit = parseInt(req.query.limit);
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    WorkOrder.countDocuments({}, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });
    const order = req.query.order;
    WorkOrder.find()
      .skip(skip)
      .sort({ $natural: -1 })
      .limit(size)
      .populate(
        "customer",
        "firstName lastName email country state city county street zipCode homePhone workPhone cellNumber"
      )
      .populate("vehicle", "year make model subModel VIN licensePlate")
      .populate("employee", "firstName lastName")
      .populate({
        path: "user",
        select: "email firstName lastName",
        populate: {
          path: "locations",
          select:
            "email phoneNumber country address state city street zipCode ",
        },
      })
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({ doc: doc, totalDoc: count });
        console.log(doc);
      });
  },

  getWorkOrderById: (req, res) => {
    const id = req.body.id;
    WorkOrder.findOne({ _id: id })
      .populate(
        "customer",
        "firstName lastName email country state city county street zipCode homePhone workPhone cellNumber"
      )
      .populate("vehicle", "year make model subModel VIN")
      .populate({
        path: "user",
        select: "email firstName lastName",
        populate: {
          path: "locations",
          select:
            "email phoneNumber country address state city street zipCode ",
        },
      })
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        // console.log(doc);
      });
  },

  getWorkOrderByVehicleId: (req, res) => {
    const id = req.body.v_id;
    WorkOrder.findOne({ vehicle: id }).exec((err, wo) => {
      if (err)
        res.status(400).json({
          error: err.message,
        });
      res.json({
        success: true,
        wo,
      });
    });
  },
};

const getWOByNoPlateImage = (req, res) => {
  let imagedata = req.files === null ? null : req.files.file.data;
  // console.log(req.files.file.mimetype.split("/")[1]);
  if (imagedata !== null) {
    let buff = new Buffer.from(req.files.file.data, "base64");
    // tesseract
    //   .recognize(buff, "eng")
    //   .then((result) => {
    //     res.status(200).send(result.data.text);
    //   })
    //   .catch((error) => {
    //     res.status(500).send(error.message);
    //   });
  }
};

// func to update the Schedule status
const scheduleStatusUpdate = (s_id) => {
  if (s_id !== "") {
    Schedule.findByIdAndUpdate(
      s_id,
      { status: "MovedToWO" },
      (err, doc) => doc
    );
  }
};

module.exports = workOrder;
