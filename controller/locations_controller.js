const Location = require("../models/locations");

const location = {
  addNewLocation: (req, res) => {
    const location = new Location(req.body);
    console.log(req.body);
    location.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
  },
  getAllLocations: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    Location.find()
      .skip(skip)
      .sort({_id: order})
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        // console.log(doc);
      });
  },
};

module.exports = location;
