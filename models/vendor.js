const mongoose = require("../config/config");
const vendorSchema = new mongoose.Schema({
    name: String,
    description: String,
    contactName: String,
    phone: String,
    contactEmail: String,
    contactfax: String,
    orderEmail: String,
    orderFax: String,
    vendorAverageFullfillmentDays: String,
    averegeShippingDaysFromVendor: String,
    address: String,
    website: String,
    weightValue: String,
    weightUnit: String,
    notes: String,
    vengorImage:String,
    time_tracks: Array
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
