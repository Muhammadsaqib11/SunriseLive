const Warehouse = require("../models/warehouse");
const Racks = require("../models/racks");

const warehouse = {
  addNewWarehouse: (req, res) => {
    Warehouse.find({}).exec((err, rack) => {
      if (rack.length === 0) {
        let no = 1;

        const warehouse = new Warehouse({ ...req.body, no });

        warehouse.save((err, doc) => {
          if (err) {
            res.status(400).json({ error: err.message });
          }

          res.json({ success: true });
        });
      } else {
        Warehouse.aggregate([
          { $group: { _id: null, num: { $max: "$no" } } },
          { $project: { _id: 0, num: 1 } },
        ]).exec(function (error, doc) {
          if (error) return res.status(400).json({ error: error.message });
          const count = doc[0].num;
          let no = count + 1;

          const newRack = new Warehouse({ ...req.body, no });

          newRack.save((err, data) => {
            if (err) {
              res.status(400).json({ error: err.message });
            }

            res.json({ success: true });
          });
        });
      }
    });
  },
  getAllWarehouses: (req, res) => {
    Warehouse.find({})
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, warehouses: doc });
      });
  },

  getAllWarehouseData: async (req, res) => {
    const warehouse = await Warehouse.findOne({ _id: req.query._id });
    const racks = await Racks.aggregate([
      { $match: { warehouse_id: warehouse._id } },
      {
        $group: {
          _id: "$warehouse_id",
          count: {
            $sum: 1,
          },
          racks: { $push: "$$ROOT" },
        },
      },
      { $unwind: "$racks" },
    ]);
    console.log(racks);
  },
};

module.exports = warehouse;
