const mongoose = require('../config/config');

const placement_logs_Schema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    subBin_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sub_Bins'
    },
    part_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'aavehicles_parts' 
    },
    // updatedStatus:String,
    // previousStatus:String,
    // entity:String,
    createdAt:Date,
    message:String,
})

const Placement_Logs = mongoose.model('Placement_Logs',placement_logs_Schema);

module.exports = Placement_Logs