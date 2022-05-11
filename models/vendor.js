const mongoose = require("../config/config");

const vendorSchema = new mongoose.Schema({
    vendorName: String,
    vendorDescription: String,
    contactName: String,
    phone: String,
    email: String,
    contactfax: String,
    orderEmail: String,
    orderFax: String,
    vendorAverageFullfillmentDays: String,
    averegeShippingDaysFromVendor: String,
    address: String,
    website: String,
    contactfax: String,
    orderEmail: String,
    imageName:[],
    time_tracks: Array
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
