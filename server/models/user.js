const mongoose = require("../config/config");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_I = 10;
const JWT_EXPIRES_IN = "10h";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  token: String,
  locations: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locations",
  },
  status: String,
  userType: String,
});

userSchema.pre("save", function (next) {
  bycrpt.genSalt(SALT_I, (err, salt) => {
    if (err) return next(err);

    console.log(salt);

    if (this.isModified("password")) {
      bycrpt.hash(this.password, salt, (err, hash) => {
        if (!err) {
          this.password = hash;
          next();
        }
      });
    } else {
      next();
    }
  });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bycrpt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};
// const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
//   expiresIn: JWT_EXPIRES_IN
// });
userSchema.methods.generateToken = function (cb) {
  let token = jwt.sign({ userId: this._id }, "supersecret", {
    expiresIn: "5 days",
  });

  // console.log(check);
  this.token = token;
  this.save((err, user) => {
    if (!err) cb(null, { token, user });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
