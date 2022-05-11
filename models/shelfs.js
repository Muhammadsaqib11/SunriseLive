const mongoose = require("../config/config");

const shelf_schema = mongoose.Schema({
    no:Number,
    rack_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Racks"
    },


},{ timestamps: true})

const Shelfs = mongoose.model("Shelfs",shelf_schema);
module.exports = Shelfs;