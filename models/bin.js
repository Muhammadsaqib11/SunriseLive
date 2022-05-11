const mongoose = require("../config/config");

const bin_schema = mongoose.Schema({
    no:Number,
    shelf_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shelfs"
    },


},{ timestamps: true})

const Bins = mongoose.model("Bins",bin_schema);
module.exports = Bins;