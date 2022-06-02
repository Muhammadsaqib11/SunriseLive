const mongoose = require("../config/config");
const warehouse = require('../models/warehouse')

const rack_schema = mongoose.Schema({
    no: Number,
    warehouse_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Warehouse"
    }
},  { timestamps: true }
)
const Racks = mongoose.model('Racks',rack_schema);
module.exports = Racks;