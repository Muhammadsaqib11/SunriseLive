const Contractor = require("../models/contractor");

const contractor = {
  addNewContractor: (req, res) => {
    const contractor = new Contractor(req.body);
    // console.log(req.body);
    contractor.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
  },
  getAllContractor: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    Contractor.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        console.log(doc);
      });
  },
};

module.exports = contractor;
