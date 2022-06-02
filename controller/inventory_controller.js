const Inventory = require("../models/inventory");

const inventory = {
  addNewInventory: (req, res) => {
    

        const labor = new Inventory(req.body);
        // console.log(req.body);
        labor.save((err, user) => {
          if (!err) {
            res.json({
              isExist: false,
              message:"",
              data:user
            });
          }
        });
 },
    
  
//   getAllLaborRate: (req, res) => {
//     const skip = parseInt(req.query.skip);
//     const limit = parseInt(req.query.limit);
//     const order = req.query.order;
//     Labor_Rate.find()
//       .skip(skip)
//       .sort({_id: order})
//       .limit(limit)
//       .populate("locations", "country state city zipCode address")
//       .exec((err, doc) => {
//         if (err) return res.status(400).send(err);
//         res.send(doc);
//         console.log(doc);
//       });
//   },
  getInventoryByLocationId: (req, res) => {
    Inventory.find({locations:req.body._id})
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        // console.log(doc);
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

module.exports = inventory;
