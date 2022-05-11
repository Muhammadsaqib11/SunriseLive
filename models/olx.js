const mongoose = require("../config/config");
var uniqueValidator = require('mongoose-unique-validator')
const olxSchema = new mongoose.Schema({
    itemType:String,
    name: String,
    image: {type:String}, 
    price: String
})

const Olx = mongoose.model('Olx', olxSchema);

module.exports= Olx;


