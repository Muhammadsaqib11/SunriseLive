const SubBins = require("../models/subBin");

const subBins = {
  addNewSubBins: (req, res) => {
    SubBins.find({}).exec((err, rack) => {
      if (rack.length === 0) {
        let no = 1;
        for (let i = 0; i < req.body.noOfSubBins; i++) {
          const newSubBins = new SubBins({ ...req.body, no });
          no++;

          newSubBins.save((err, doc) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            if (i === req.body.noOfSubBins - 1) {
              res.json({ success: true });
            }
          });
        }
      } else {
        SubBins.aggregate([
          { $group: { _id: null, num: { $max: "$no" } } },
          { $project: { _id: 0, num: 1 } },
        ]).exec(function (error, doc) {
          if (error) return res.status(400).json({ error: error.message });
          const count = doc[0].num;
          let no = count;

          for (let i = 0; i < req.body.noOfSubBins; i++) {
            // console.log("rack",no)
            no++;
            const newSubBins = new SubBins({ ...req.body, no });

            newSubBins.save((err, data) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }

              // console.log(i===req.body.noOfSubBins-1)
              if (i === req.body.noOfSubBins - 1) {
                res.json({ success: true });
              }
            });
          }
        });
      }
    });
  },

  getAllSubBins: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;
    SubBins.countDocuments({}, function (err, doc) {
      count = doc;
    });
    SubBins.find({})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate({
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
      })
      .exec((err, doc) => {
        console.log(count);
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, subBins: doc, totalDoc: count });
      });
  },

  getSearchedSubBins: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;
    SubBins.countDocuments(
      { $or: [{ no: parseInt(req.query.search) }] },
      function (err, doc) {
        count = doc;
      }
    );

    SubBins.find({ $or: [{ no: parseInt(req.query.search) }] })
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .populate({
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
      })
      .exec((err, doc) => {
        //   console.log(count)
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, subBins: doc, totalDoc: count });
      });
  },
};

module.exports = subBins;
