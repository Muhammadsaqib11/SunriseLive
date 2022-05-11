const mongoose = require("../config/config");

const cabinet_Schema = new mongoose.Schema({
  name: String,
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
  no: String,
});

const Cabinets = mongoose.model("Cabinets", cabinet_Schema);

module.exports = Cabinets;
