const mongoose = require("../config/config");

const inspectionTestSchema = new mongoose.Schema(
  {
    title:String,
    inspection_categories:[]
  },
  { timestamps: true }
);

const inspection_tests = mongoose.model("inspection_tests", inspectionTestSchema);

module.exports = inspection_tests;
