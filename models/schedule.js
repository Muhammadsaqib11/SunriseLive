const mongoose = require("../config/config");

const schedulesSchema = new mongoose.Schema({
  date: Date,
  jobCategory: [],
  serviceDescription: String,
  textColor: String,
  status: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true });

const Schedule = mongoose.model("schedules", schedulesSchema);

module.exports = Schedule;
