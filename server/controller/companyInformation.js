const CompanyInfo = require("../models/company-info-");

const companyInformation = {
  addNewCompanyInfo: (req, res) => {
    const companyInfo = new CompanyInfo(req.body);
    console.log(req.body);
    const id = req.body.id 
    if(id !==''){
      CompanyInfo.findByIdAndUpdate(id,req.body,{useFindAndModify:true,new:true},(err,user)=>{
        if (!err) {
          res.send(user);
        }
      })
    }
    else{companyInfo.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    })}
  },
  getAllCompanyInfo: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    CompanyInfo.findOne({}).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        
        if(doc === null){

          console.log(doc);
          res.send(null);
        }else{
          
          res.send(doc);
        }
        
      });
  },
  getCustomerVehicles: (req, res) => {
    console.log(req.body)
    Vehicle.find({customer:req.body.vehicle}, (err, data)=>{
      res.send(data)
      // console.log(data)
    })
  },
};

module.exports = companyInformation;
