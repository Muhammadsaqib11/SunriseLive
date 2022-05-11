const Check = require("../models/checkTemplate");

const check = {
  addNewCheck: (req, res) => {
    const check = new Check(req.body);
    console.log(req.body);
    check.save((err, doc) => {
      if (!err) {
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
  },
  getAllChecks: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    Check.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .populate("bank", "bankName accountType routingNumber accountNumber")
      .populate("authorizedUser", "name email phNumber")
      .populate("location", "address city")
      .exec((err, doc) => {
        // if (err) return res.status(400).send(err);
        // res.send(doc);
        // console.log(doc);
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
  getOneCheck: (req, res) => {
    Check.findOne({})
      .populate("bank", "bankName accountType routingNumber accountNumber")
      .populate("authorizedUser", "name email phNumber")
      .populate("location", "address city")
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        if (!err) {
          res.send(doc);
          // console.log(doc)
        }
      });
  },
  getCheckById: (req, res) => {
    Check.findOne({ _id: req.body.id })
      .populate("bank", "bankName accountType routingNumber accountNumber")
      .populate("authorizedUser", "name email phNumber")
      .populate("location", "address city")
      .exec((err, doc) => {
        res.send(doc);
      });
  },
  getCheckBylocation: (req, res) => {
    Check.findOne({$and:[{ location: req.body.locationId}, {status:"Verified"}]})
      .populate("bank", "bankName accountType routingNumber accountNumber")
      .populate("authorizedUser", "name email phNumber")
      .populate("location", "address city")
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        res.send(doc);
      });
  },

  checkStatusVerified: (req, res) => {
    // console.log(req.body);
    Check.findByIdAndUpdate(
      req.body._id,
      { status: req.body.status },
      { useFindAndModify: false },
      (err, data) => {
        if (!err) {
          // console.log(data);
          res.send("Password Has been updated!!!!!");
        }
      }
    );
  },
};

module.exports = check;
