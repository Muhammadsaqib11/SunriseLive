const AuthorizedUser_BankAccount = require('../models/authorizedUser_bankAccount')

const AuthorizedBankAccounts={
    getAuthorizedUserBanks:(req, res)=>{
        // AuthorizedUser_BankAccount.aggregate([{
        //     $unwind: '$account'
        // }])
        // .exec(function(err, doc) {
        //     if(err) return
        //     console.log(doc)
            
        // })
        AuthorizedUser_BankAccount.find({}).populate('account','bankName').populate('authorizedIndividual','name')
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.send(doc);
            console.log(doc);
          });
    }
}
module.exports = AuthorizedBankAccounts;