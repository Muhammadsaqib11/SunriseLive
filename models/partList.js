const mongoose = require("../config/config");

const part_list_Schema = new mongoose.Schema({
  name:String,
});

const Parts_List = mongoose.model("Parts_List", part_list_Schema);

module.exports = Parts_List;
