const Racks = require("../models/racks");

const racks = {
    
  addNewRack: (req, res) => {
    Racks.find({}).exec((err, rack) => {
      if (rack.length === 0) {
        let no = 1000;
        for (let i = 0; i < req.body.noOfRacks; i++) {
          const newRack = new Racks({ ...req.body, no });
          no++;

          newRack.save((err, doc) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            if (i === req.body.noOfRacks - 1) {
              res.json({ success: true });
            }
          });
        }
      } else {
        Racks.aggregate([
          { $group: { _id: null, num: { $max: "$no" } } },
          { $project: { _id: 0, num: 1 } },
        ]).exec(function (error, doc) {
          if (error) return res.status(400).json({ error: error.message });
          const count = doc[0].num;
          let no = count;

          for (let i = 0; i < req.body.noOfRacks; i++) {
            // console.log("rack",no)
            no++;
            const newRack = new Racks({ ...req.body, no });

            newRack.save((err, data) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }

              console.log(i === req.body.noOfRacks - 1);
              if (i === req.body.noOfRacks - 1) {
                res.json({ success: true });
              }
            });
          }
        });
      }
    });
  },

  getAllRacks: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;
    Racks.countDocuments({}, function (err, doc) {
      count = doc;
    });

    Racks.find({})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate("warehouse_id")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, racks: doc, totalDoc: count });
      });
  },

  getRacksByWhId: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;
    Racks.countDocuments(
      { $or: [{ no: parseInt(req.query.search) }] },
      function (err, doc) {
        count = doc;
      }
    );

    // console.log(req)
    Racks.find({ warehouse_id: req.query._id })
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate("warehouse_id")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, racks: doc, totalDoc: count });
      });
  },
};

module.exports = racks;
