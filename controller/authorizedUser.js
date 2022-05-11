const AuthorizedUser = require("../models/authorizedUser");
const AuthorizedUser_BankAccount = require('../models/authorizedUser_bankAccount')

const authorizedUser = {
  addNewauthorizedUser: (req, res) => {
    const status='default';
    const account = req.body.account
    const authorizedUser = new AuthorizedUser({...req.body,status});
    // console.log(req.body);
    authorizedUser.save((err, user) => {
      if (!err) {
        res.send(user)
        if(user._id){
          account.map(item=>{
            const user_bank = new AuthorizedUser_BankAccount({'account':item._id,'authorizedIndividual':user._id});
            user_bank.save((err, doc) => {
              if (!err) {
                // console.log(doc)
              };
            })
          })
        }
      }
    });
  },
  getAllauthorizedUsers: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    AuthorizedUser.find()
      .skip(skip)
      .sort({_id: order})
      .limit(limit)
      // .populate('account',"bankName accountType accountNumber")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        // console.log(doc);
      });
  },
  getAuthorizedUsers: (req, res) => {
   console.log(req.body)
    AuthorizedUser.findOne({_id:req.body.id}).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        // console.log(doc);
      });
  },
  // getCustomerauthorizedUsers: (req, res) => {
  //   console.log(req.body)
  //   authorizedUser.find({customer:req.body.authorizedUser}, (err, data)=>{
  //     res.send(data)
  //     // console.log(data)
  //   })
  // },
};

module.exports = authorizedUser;
