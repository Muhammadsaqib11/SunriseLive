const mongoose = require("../config/config");

const roomSchema = new mongoose.Schema({
  name:String,
});

const Rooms = mongoose.model("Rooms", roomSchema);

module.exports = Rooms;