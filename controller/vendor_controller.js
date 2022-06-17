const Vendor = require("../models/vendor");
const fs = require("fs");

const vendor = {
    // addNewcustomer
  addNewuVendor: (req, res) => {
    // const displayName = `${req.body.titleName} ${req.body.firstName} ${req.body.lastName}`;
    console.log("req", req.body)

    const vendor = new Vendor({ ...req.body });
    vendor.save((err, user) => {
      if (!err) {
        console.log(user);
        res.send([user]);
      }
    });
  },

  addVendorImage: (req, res) => {
    // console.log("req", req)
    let mdata = req.files === null ? null : req.files.file.data;
    console.log(req.files)
    console.log(req.files.file.mimetype.split("/")[1]);
    // console.log(mdata)
    if (mdata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");

      fs.writeFile(
        `public/vendor/${req.files.file.name}`,
        buff,
        function (err) {
          if (err) {
            res.send(err);
          } else {
            console.log("success")
            res.json({ success: true });
          }
        }
      );
    }
    if (mdata === null) {
      res.json({ success: false, message: "no image file to Save" });
    }
  },

  getVendor: (req, res) => {

    console.log(req.body);
    const data = req.body.data;
    Vendor.find(
      {
        $or: [
          { firstName: data },
          { lastName: data },
          { cellNumber: data },
          { city: data },
          { email: data },
          { zipCode: data },
        ],
      },
      (err, data) => {
        console.log(data);
        if (data.length > 0) {
          res.json({
            success: true,
            data,
          });
        } else {
          res.json({ message: "No data found" });
        }
      }
    );
  },

  getAllVendors: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    Vendor.countDocuments({}, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });

    Vendor.find()
      // .sort({_id: order})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(size)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({ doc: doc, totalDoc: count });
        // console.log(doc);
      });
  },
  
  updateVendorById: (req, res) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      contactName: req.body.contactName,
      phone: req.body.phone,
      contactEmail: req.body.contactEmail,
      orderEmail: req.body.orderEmail,
      orderFax: req.body.orderFax,
      vendorAverageFullfillmentDays: req.body.vendorAverageFullfillmentDays,
      averegeShippingDaysFromVendor: req.body.averegeShippingDaysFromVendor,
      address: req.body.address,
      website: req.body.website,
      notes: req.body.notes,
      weightValue: req.body.weightValue,
      weightUnit: req.body.weightUnit,
      vengorImage:req.body.vendorImage
    };
    Vendor.findByIdAndUpdate(req.body._id, data, (err, doc) => {
      if (!err) {

        res.json({ success: true , message:'Successfully Update Vendor'});
      }
    });
  },
};

module.exports = vendor;
