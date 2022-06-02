const BankAccount = require("../models/bankAccount");
const BankAccount_Locations = require("../models/bankAccount_locations");

const bankAccount = {
  addNewbankAccount: (req, res) => {
    const bankAccount = new BankAccount(req.body);
    const location = req.body.location

    console.log(req.body);
    bankAccount.save((err, user) => {
      if (!err) {
        res.send(user);
        if(user._id){
          location.map(item=>{
            const bank_location = new BankAccount_Locations({'account':user._id,'location':item._id});
            bank_location.save((err, doc) => {
              if (!err) {
                console.log(doc)
              };
            })
          })
        }
      }
    });
  },
  getAllbankAccounts: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    BankAccount.find()
      .skip(skip)
      .sort({_id: order})
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        // console.log(doc);
      });
  },
  // getCustomerbankAccounts: (req, res) => {
  //   console.log(req.body)
  //   bankAccount.find({customer:req.body.bankAccount}, (err, data)=>{
  //     res.send(data)
  //     // console.log(data)
  //   })
  // },
};

module.exports = bankAccount;
