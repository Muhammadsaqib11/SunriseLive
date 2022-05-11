const Employee = require("../models/employee");

const employee = {
  addNewEmployee: (req, res) => {
    const employee = new Employee(req.body);
    console.log(req.body);
    employee.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
  },
  getAllEmployee: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    Employee.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        console.log(doc);
      });
  },
  getEmployeeById: (req, res) => {
    
    const _id = req.query._id;
    Employee.findOne({_id: _id})
      
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        
      });
  },
  updateEmployeeById: (req, res) => {
    const _id=req.body._id;
    const data=req.body.data;
    // console.log(req)
    Employee.findByIdAndUpdate(req.body._id,data,(err, doc)=>{
      if (!err) {
        res.send(doc);
      }
    })
  },
  updateEmployeeTaxById: (req, res)=>{
    const _id=req.body.e_id;
    const data=req.body;
    const field=`taxInfo.${req.body.field}`;

    Employee.findByIdAndUpdate(
      _id,
      { $set:{ [field] : data  }},
      (err, doc) => {
        if (!err) {
          // console.log(doc);

          res.send(doc);
        }
        if(err){
          console.log(err)
        }
      }
    )
  }
};

module.exports = employee;
