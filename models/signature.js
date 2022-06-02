const mongoose = require("../config/config");

const signatureSchema = new mongoose.Schema({
  signature: String,
});

const Signature = mongoose.model("Signature", signatureSchema);

module.exports = Signature;
