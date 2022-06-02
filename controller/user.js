const User = require("../models/user");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login =async (req, res)=>{
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  await User.findOne({ email: req.body.email })
  .then(function(user) {
    console.log("user", user)
      if(user){
        bycrpt.compare(password, user.password).then(function (passcheck) {
            console.log("passcheck", passcheck)
              if(passcheck){
                  var jwtUser = {
                      email: user.email,
                      // name: user.name,
                      // score: user.score,
                      // accesslevel: "all"
                  };

                  var token = jwt.sign(jwtUser,"secret_this_should_be_longer", {
                      expiresIn: 1440 
                      //expires in 24 hours
                  });

                  res.status(200).json({
                    success: true,
                    message: 'Here´s your token.',
                    token: token, 
                    email:user.email,
                    firstName:user.firstName,
                    status:user.status
                     });
                  /*
                  var resp = {success: true, message: 'Heres your token.', token: token};
                  response.write(JSON.stringify(resp));
                  */
              }else{
                  res.status(401).json({
                      success: false,
                      message: 'Authentification failed. Password or email wrong'
                  });
              }
          });
      }else{
          res.status(401).send({
              success: false,
              message: 'Authentification failed.'
          });
      }
  })
  // User.findOne({ email: req.body.email })
  //   .populate("locations","country state city")
  //   .exec((err, user) => {
  //     if (!err) {
  //       if(!user) return res.json({isAuth: false, message: "email"}).T


     

  //       user.comparePassword(req.body.password, (err, isMatch) => {
  //         if (!isMatch) {
  //           return res.json({
  //             isAuth: false,
  //             message: "password",
  //           });
  //         }
  //         user.generateToken((err, user) => {
  //           // const accessToken = jwt.sign({ userId: user.id }, {
  //           //   expiresIn: '2h'
  //           // });
  //           // user.token = accessToken;
  //           // console.log("accessToken", accessToken)
  //           // console.log(user.token);
  //           if (!err) res.cookie("auth", user.token).json({isAuth:true,message:'',user});
  //         });
  //       });
  //     }
  //   });
}
const user = {
  register: (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save((err, user) => {
      if (!err) {
        user.generateToken((err, user) => {
          if (!err) res.cookie("auth", user.token).send(user);
        });
      }
    });
  },
  login:  async (req, res) => {
    console.log("req", req.body);
    var email = req.body.email;
    var password = req.body.password;

  await User.findOne({ email: req.body.email })
    .then(function (user) {
      console.log("user", user)
        if(user){
          bycrpt.compare(password, user.password).then(function (passcheck) {
              console.log("passcheck", passcheck)
                if(passcheck){
                    var jwtUser = {
                        email: user.email,
                        // name: user.name,
                        // score: user.score,
                        // accesslevel: "all"
                    };

                    var token = jwt.sign(jwtUser,"secret_this_should_be_longer", {
                        expiresIn: 1440 
                        //expires in 24 hours
                    });

                    res.status(200).json({
                      success: true,
                      message: 'Here´s your token.',
                      token: token, 
                      email:user.email,
                      firstName:user.firstName,
                      status:user.status
                       });
                    /*
                    var resp = {success: true, message: 'Heres your token.', token: token};
                    response.write(JSON.stringify(resp));
                    */
                }else{
                    res.status(401).json({
                        success: false,
                        message: 'Authentification failed. Password or email wrong'
                    });
                }
            });
        }else{
            res.status(401).send({
                success: false,
                message: 'Authentification failed.'
            });
        }
    })
    // User.findOne({ email: req.body.email })
    //   .populate("locations","country state city")
    //   .exec((err, user) => {
    //     if (!err) {
    //       if(!user) return res.json({isAuth: false, message: "email"}).T


       

    //       user.comparePassword(req.body.password, (err, isMatch) => {
    //         if (!isMatch) {
    //           return res.json({
    //             isAuth: false,
    //             message: "password",
    //           });
    //         }
    //         user.generateToken((err, user) => {
    //           // const accessToken = jwt.sign({ userId: user.id }, {
    //           //   expiresIn: '2h'
    //           // });
    //           // user.token = accessToken;
    //           // console.log("accessToken", accessToken)
    //           // console.log(user.token);
    //           if (!err) res.cookie("auth", user.token).json({isAuth:true,message:'',user});
    //         });
    //       });
    //     }
    //   });
  },
  fetchMechanic: (req, res) => {
    User.find({ $and: [{ userType: "Mechanic" }] }).exec((err, doc) => {
      res.send(doc);
    });
  },
  fetchUsers: (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;
    console.log(req.query);
    User.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .populate("locations", "country state city zipCode")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);

        res.send(doc);
      });
  },

  fetchMechanic: (req, res) => {
    User.find({ $and: [{ userType: "Mechanic" }] }).exec((err, doc) => {
      res.send(doc);
    });
  },
  myAccount: (req, res) => {
    User.findOne({ _id: req.body._id })
      .populate("locations", "country state city")
      .exec((err, user) => {
        if (!err) {
          // console.log(user);

          res.send(user);
        }
      });
  },
  updatePasswordfromAdmin: (req, res) => {
    const SALT = 10;
    bycrpt.hash(req.body.password.newPassword, SALT, async (err, hash) => {
      User.findOneAndUpdate(
        req.body._id,
        { password: hash },
        { useFindAndModify: false },
        (err, data) => {
          if (!err) {
            res.send("Password Has been updated!!!!!");
          }
        }
      );
    });
  },
  // console.log(req.body);
  updateStatus: (req, res) => {
    User.findByIdAndUpdate(
      req.body.id,
      { status: req.body.status },
      (err, user) => {
        if (!err) {
          // console.log(user);

          res.send(user);
        }
      }
    );
  },
};

module.exports =user;
