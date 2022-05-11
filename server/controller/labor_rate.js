const Labor_Rate = require("../models/labor_Rate");

const labor_Rate = {
  addNewLaborRate: (req, res) => {
    Labor_Rate.find({locations:req.body.locations}).exec((err,data) => {
      if(data.length>0){
        console.log(data);
        res.json({
          isExist: true,
          message:"Labor Rate exists",
          data:data
        });
      }else{

        const labor = new Labor_Rate(req.body);
        console.log(req.body);
        labor.save((err, user) => {
          if (!err) {
            res.json({
              isExist: false,
              message:"",
              data:user
            });
          }
        });
      }
    })
  },
  getAllLaborRate: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    Labor_Rate.find()
      .skip(skip)
      .sort({_id: order})
      .limit(limit)
      .populate("locations", "country state city zipCode address")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        console.log(doc);
      });
  },
  getLaborRateByLocationId: (req, res) => {
    Labor_Rate.findOne({locations:req.body.id})
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

module.exports = labor_Rate;
