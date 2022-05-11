const mongoose = require("../config/config");

const aavehicles_marketing = mongoose.Schema({
    images:Array,
    videos:Array,
    vehicle_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle'
    }
},{ timestamps: true})

const AAVehicles_Marketing = mongoose.model('AAVehicles_Marketing',aavehicles_marketing);

module.exports = AAVehicles_Marketing;