const mongoose = require('../config/config');

const logsSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vehicle_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle'
    },
    part_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'aavehicles_parts' 
    },
    updatedStatus:String,
    previousStatus:String,
    entity:String,
    createdAt:Date,
    message:String,
})

const Logs = mongoose.model('Logs',logsSchema);

module.exports = Logs