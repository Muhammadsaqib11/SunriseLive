const PartPrice = require("../models/partPriceManager");

const partPrice = {
  addNewPartPrice: (req, res) => {
    const partPrice = new PartPrice(req.body);
    console.log(req.body);
    partPrice.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
  },
  getAllPartPrice: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    PartPrice.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        console.log(doc);
      });
  },
  //   getCustomerVehicles: (req, res) => {
  //     console.log(req.body)
  //     Vehicle.find({customer:req.body.vehicle}, (err, data)=>{
  //       res.send(data)
  //       // console.log(data)
  //     })
  //   },
};

module.exports = partPrice;
