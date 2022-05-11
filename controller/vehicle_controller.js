const Cabinets = require("../models/cabinets");
const Logs = require("../models/logs");
const Vehicle = require("../models/vehicle");
const Rooms = require("../models/rooms");
const logs_utils = require("../utils/logs_utils");

const vehicle = {
  addNewvehicle: (req, res) => {
    delete req.body._id;
    const vehicle = new Vehicle(req.body);
    vehicle.save((err, user) => {
      if (!err) {
        res.send(user);
      }
      if (err) {
        console.log(err);
      }
    });
  },

  getAllvehicles: (req, res) => {
    // const skip = parseInt(req.query.skip);
    // const limit = parseInt(req.query.limit);
    // const order = req.query.order;

    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    Vehicle.countDocuments({}, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });

    Vehicle.find()
      // .sort({_id: order})
      .sort({ $natural: -1 })
      .skip(skip)
      // .limit(limit)
      .limit(size)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        // res.send(doc);
        res.json({ doc: doc, totalDoc: count });
        // console.log(doc);
      });
  },

  getAAvehicles: (req, res) => {
    // console.log(req.body)
    const keyOne = req.query.keyOne;
    const keyTwo = req.query.keyTwo;
    const keyThree = req.query.keyThree;
    const keyFour = req.query.keyFour;

    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    Vehicle.countDocuments(
      {
        $and: [
          { isOwnedBy: "A&A" },
          {
            $or: [
              { status: keyOne },
              { status: keyTwo },
              { status: keyThree },
              { status: keyFour },
            ],
          },
        ],
      },
      function (err, docCount) {
        if (err) {
          return handleError(err);
        } //handle possible errors
        console.log("docCount", docCount);
        count = docCount;
        //and do some other fancy stuff
      }
    );

    Vehicle.find({
      $and: [
        { isOwnedBy: "A&A" },
        {
          $or: [
            { status: keyOne },
            { status: keyTwo },
            { status: keyThree },
            { status: keyFour },
          ],
        },
      ],
    })
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.json({ doc: data, totalDoc: count });
        console.log(err);
      });
  },

  getCustomerVehicles: (req, res) => {
    console.log(req.body);
    Vehicle.find({ customer: req.body.vehicle }, (err, data) => {
      res.send(data);
      // console.log(data)
    });
  },

  getAAVehicleById: (req, res) => {
    Vehicle.findOne({ _id: req.query.id }, (err, data) => {
      if (err) res.status(400).json({ error: err.message });
      res.json({ success: true, vehicle: data });
      // console.log(data)
    });
  },

  // aaVehicle update
  updateAAVehicleById: (req, res) => {
    if (req.body._id && req.body.user._id) {
      const newStatus = req.body.status;
      const prevStatus = req.body.prevStatus;
      const user = req.body.user;
      const entity = req.body.entity;
      console.log(req.body);
      Vehicle.findByIdAndUpdate(
        req.body._id,
        { $set: { status: req.body.status } },
        (err, doc) => {
          if (!err) {
            // createLogs(newStatus,prevStatus,user,intity,req.body._id)
            logs_utils.createLogs(
              newStatus,
              prevStatus,
              user,
              entity,
              req.body._id
            );

            res.json({ success: true });
          }
        }
      );
    } else {
      res.json({ error: "Missing Data Values" });
    }
  },

  // aaVehicle Time Tracks update
  updateAAVehicleTimeTracks: (req, res) => {
    if (req.body._id) {
      if (req.body.elapsed_status == "Start") {
        var h = {
          elapsed_status: "Start",
          status: req.body.status,
          start_time: req.body.start_time,
          stop_time: "",
          elapsed_time: "",
        };

        Vehicle.findByIdAndUpdate(
          req.body._id,
          { $push: { time_tracks: h } },
          { new: true, upsert: true },
          (err, doc) => {
            if (!err) {
              res.json({
                success: true,
                data: h,
              });
            }
          }
        );
      } else if (req.body.elapsed_status == "Stop") {
        Vehicle.findOne({ _id: req.body._id }, (err, data) => {
          if (err) res.status(400).json({ error: err.message });

          // let obj = data.time_tracks[data.time_tracks.length - 1];
          // let ind = data.time_tracks.length - 1;

          var h = {
            elapsed_status: "Stop",
            status: req.body.status,
            stop_time: req.body.stop_time,
            elapsed_time: req.body.elapsed_time,
          };

          const arr = data.time_tracks;
          let obj = arr[arr.length - 1];
          const indx = arr.length - 1;

          obj.elapsed_status = "Stop";
          obj.stop_time = req.body.stop_time;
          obj.elapsed_time = req.body.elapsed_time;

          arr[indx] = obj;

          Vehicle.findByIdAndUpdate(
            req.body._id,
            { $set: { time_tracks: arr } },
            { new: true, upsert: true },
            (err, doc) => {
              if (!err) {
                res.json({
                  success: true,
                  data: h,
                });
              }
            }
          );
        });
      }
    } else {
      res.json({ error: "Error, Plz Check" });
    }
  },

  // vehicle update.........
  updateVehicleById: (req, res) => {
    if (req.body._id && req.body.user._id) {
      const newStatus = req.body.status;
      const prevStatus = req.body.prevStatus;
      const user = req.body.user;
      const entity = req.body.entity;

      const data = {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        licensePlate: req.body.licensePlate,
        subModel: req.body.subModel,
        engine: req.body.engine,
        vehicleMillage: req.body.vehicleMillage,
        VIN: req.body.VIN,
        yardName: req.body.yardName,
        yardNumber: req.body.yardNumber,
        lotNumber: req.body.lotNumber,
        purchaseDate: req.body.PurchaseDate,
        purchasePrice: req.body.purchasePrice,
        color: req.body.color,
        hasKeys: req.body.hasKeys,
        estRetailValue: req.body.estRetailValue,
        saleTitle: req.body.saleTitle,
        transmission: req.body.transmission,
        drive: req.body.drive,
        fuelType: req.body.fuelType,
        cylinders: req.body.cylinders,
        runsAnddrive: req.body.runsAnddrive,
        damageDescription: req.body.damageDescription,
        status: req.body.status,
        // customer: req.body.customer
      };

      Vehicle.findByIdAndUpdate(
        req.body._id,
        data,
        { useFindAndModify: false },
        (err, doc) => {
          if (err) return res.status(400).json({ error: err.message });
          if (!err && doc) {
            // console.log(doc);
            logs_utils.createLogs(
              newStatus,
              prevStatus,
              user,
              entity,
              req.body._id,
              (partId = null)
            );
          }
          res.json({ success: true });
        }
      );
    } else {
      res.json({ error: "Missing Data Values" });
    }
  },

  // method for cabinets collection......

  addNewPartsCabinet: (req, res) => {
    Cabinets.find({}).exec((err, rack) => {
      if (rack.length === 0) {
        let no = 1;

        const cabinets = new Cabinets({ ...req.body, no });

        Cabinets.save((err, doc) => {
          if (err) {
            res.status(400).json({ error: err.message });
          }

          res.json({ success: true });
        });
      } else {
        Cabinets.aggregate([
          { $group: { _id: null, num: { $max: "$no" } } },
          { $project: { _id: 0, num: 1 } },
        ]).exec(function (error, doc) {
          // console.log("agregdoc", doc[0].num);
          if (error) return res.status(400).json({ error: error.message });
          const count = doc[0].num;
          let mi = count;
          let splittedString = mi.slice(4);
          let convertedInteger = parseInt(splittedString);
          let incrementedString = convertedInteger + 1;
          let convertedString = String(incrementedString);
          let no = "cab-000" + convertedString;
          // console.log(typeof(no));

          const newCabinets = new Cabinets({ ...req.body, no });

          newCabinets.save((err, data) => {
            if (err) {
              res.status(400).json({ error: err.message });
            }

            res.json({ success: true });
          });
        });
      }
    });
  },

  getAllCabinets: (req, res) => {
    Cabinets.find()
      .populate("rooms", "name")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, cabinets: doc });
      });
  },

  getCabinetById: (req, res) => {
    Cabinets.findOne({ id: req.query._id })
      .populate("room_id")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, cabinet: doc });
      });
  },

  getAllRooms: (req, res) => {
    Rooms.find({})
      // .populate("name")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, cabinets: doc });
      });
  },

  getRoomById: (req, res) => {
    Rooms.findOne({ id: req.query._id })
      // .populate("name")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, doc: doc });
      });
  },
};

module.exports = vehicle;

// const createLogs = (newStatus,prevStatus,user,intity,vehicle)=>{
//   const createdAt= new Date();
//     const message = `${user.firstName} ${user.lastName} has changed "${intity}" status from "${prevStatus}" to "${newStatus}" at "${createdAt}"`
//     const data = {
//       user_id: user._id,
//       vehicle_id: vehicle._id,
//       updatedStatus:newStatus,
//       previousStatus:prevStatus,
//       createdAt,
//       intity,
//       message
//     }
//     const log = new Logs(data);

//     log.save();

//   }
