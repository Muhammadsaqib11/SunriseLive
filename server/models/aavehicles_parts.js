const mongoose = require("../config/config");

const part_schema = new mongoose.Schema({
    name:String,
    imageName:[],
    status:String,
    partNo:Number,
    salePrice: Number,
    wc_id: Number,
    cabinet_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cabinets'
    },
    vehicle_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle'
    },
    subBin_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sub_Bins'
    }
},
    { timestamps: true},
)

const aavehicles_parts = mongoose.model('aavehicles_parts',part_schema);
module.exports = aavehicles_parts
