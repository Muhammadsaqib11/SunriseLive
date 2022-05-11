const VehicleParts = require("../models/vehicleParts");

const vehiclePart = {
    addVehiclePart: (req, res) => {
    const vpart = new VehicleParts(req.body);
    console.log(req.body);
    vpart.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
   
  },
  getAllVehicleParts: (req, res) => {
    
    VehicleParts.find()
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        console.log(doc);
      });
  },

};

module.exports = vehiclePart;
