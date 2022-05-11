const Bins = require("../models/bin");

const bins = {
    
  addNewBins: (req, res) => {
    Bins.find({}).exec((err, rack) => {
      if (rack.length === 0) {
        let no = 1;
        for (let i = 0; i < req.body.noOfBins; i++) {
          const newBins = new Bins({ ...req.body, no });
          no++;

          newBins.save((err, doc) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            if (i === req.body.noOfBins - 1) {
              res.json({ success: true });
            }
          });
        }
      } else {
        Bins.aggregate([
          { $group: { _id: null, num: { $max: "$no" } } },
          { $project: { _id: 0, num: 1 } },
        ]).exec(function (error, doc) {
          if (error) return res.status(400).json({ error: error.message });
          const count = doc[0].num;
          let no = count;

          for (let i = 0; i < req.body.noOfBins; i++) {
            // console.log("rack",no)
            no++;
            const newBins = new Bins({ ...req.body, no });

            newBins.save((err, data) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }

              // console.log(i===req.body.noOfBins-1)
              if (i === req.body.noOfBins - 1) {
                res.json({ success: true });
              }
            });
          }
        });
      }
    });
  },

  getAllBins: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;
    Bins.countDocuments({}, function (err, doc) {
      count = doc;
    });

    Bins.find({})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate({
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
      })
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, bins: doc, totalDoc: count });
      });
  },

  getBinsByShelfId: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;
    Bins.countDocuments(
      { $or: [{ no: parseInt(req.query.search) }] },
      function (err, doc) {
        count = doc;
      }
    );

    Bins.find({ shelf_id: req.query._id })
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate({
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
      })
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, bins: doc, totalDoc: count });
      });
  },
};

module.exports = bins;
