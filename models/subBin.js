const mongoose = require("../config/config");

const subBin_schema = mongoose.Schema({
    no:Number,
    bin_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bins"
    },


},{ timestamps: true})

const Sub_Bins = mongoose.model("Sub_Bins",subBin_schema);
module.exports = Sub_Bins;