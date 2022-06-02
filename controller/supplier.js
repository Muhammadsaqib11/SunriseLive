const Supplier = require("../models/supplier");

const supplier = {
  addNewsupplier: (req, res) => {
    const supplier = new Supplier(req.body);
    console.log(req.body);
    supplier.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
  },
  getAllsuppliers: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    Supplier.find()
      .skip(skip)
      .sort({_id: order})
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        console.log(doc);
      });
  },
};

module.exports = supplier;
