const InspectionCategory = require("../models/inspection_categories");

const inspection_category_controller = {
  addInspectionCategory: (req, res) => {
    const cat = new InspectionCategory(req.body);
    console.log(req.body);
    cat.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
    // InspectionCategory.insertMany([
    //   { name: "AC Performance" },
    //   { name: "Air Filters (Cabin, Engine, Fuel, Others)" },
    //   { name: "Alignment,Axle, Axle Joint, & Wheel Bearing Condition" },
    //   { name: "Ball Joints" },
    //   { name: "Brake System/Operation" },
    //   { name: "Catalytic Converters" },
    //   { name: "Control Arms and Bushings" },
    //   { name: "Cooling System" },
    //   { name: "Drive & Visual Inspection" },
    //   { name: "Drive Belt, Driveshaft, Tensioners" },
    //   { name: "Emissions Test" },
    //   { name: "Engine Operation/Performance" },
    //   { name: "Exhaust System" },
    //   { name: "Fluid Levels/Conditions" },
    //   { name: "Fan Clutch and Fan" },
    //   { name: "Gaskets, and others" },
    //   { name: "Ignition System" },
    //   { name: "Instrumental Panel & Gauges" },
    //   { name: "Lighting Systems" },
    //   { name: "Measure & Visual Inspection" },
    //   { name: "Mirrors" },
    //   { name: "Motor Mount" },
    //   { name: "Miscellaneous" },
    //   { name: "Oil Dipstick" },
    //   { name: "Next Service Date" },
    //   { name: "Other Concerns" },
    //   { name: "Outer Body" },
    //   { name: "Perfomance & Visual Test" },
    //   { name: "Perfomance Check" },
    //   { name: "Perfomance Test" },
    //   { name: "Perform SMOG Service" },
    //   { name: "Schedule Maintenance" },
    //   { name: "Safety Check" },
    //   { name: "Starting/Charging System" },
    //   { name: "Shocks, Struts, Stabilizer, Links, Suspension" },
    //   { name: "Steering/Handling/Suspension" },
    //   { name: "Sway Bar Links" },
    //   { name: "Tie Rods" },
    //   { name: "Tires Condition, Rotation, Depth Measurement, Pressure" },
    //   { name: "Top Off & Verify Visually" },
    //   { name: "Transmission" },
    //   { name: "Warning Light: Check & Operation" },
    //   { name: "Wipers/Washers" },
    //   { name: "U-Joints" },
    // ])
  },
  getAllInspectionCategories: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    InspectionCategory.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      //   .populate("locations", "country state city zipCode address")
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

module.exports = inspection_category_controller;
