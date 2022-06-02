const mongoose = require("../config/config");

const authorizedUserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phNumber: String,
    status: String,
    
  },
  { timestamps: true }
);

const AuthorizedUser = mongoose.model("AuthorizedUser", authorizedUserSchema);

module.exports = AuthorizedUser;
