const User = require("../models/user");
const bycrpt = require("bcrypt");

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
  login: (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
      .populate("locations","country state city")
      .exec((err, user) => {
        if (!err) {
          if(!user) return res.json({isAuth: false, message: "email"})

          // const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
          //   expiresIn: JWT_EXPIRES_IN
          // });
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
              return res.json({
                isAuth: false,
                message: "password",
              });
            }
            user.generateToken((err, user) => {
              // console.log(user.token);
              if (!err) res.cookie("auth", user.token).json({isAuth:true,message:'',user});
            });
          });
        }
      });
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

module.exports = user;
