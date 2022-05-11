const Customer = require("../models/customer");

const customer = {

  addNewcustomer: (req, res) => {
    const displayName = `${req.body.titleName} ${req.body.firstName} ${req.body.lastName}`;

    const customer = new Customer({ ...req.body, displayName });
    customer.save((err, user) => {
      if (!err) {
        console.log(user);
        res.send([user]);
      }
    });
  },

  getCustomer: (req, res) => {
    // Customer.find()
    //   .sort({_id: order})
    //   .exec((err, doc) => {
    //     if (err) return res.status(400).send(err);
    //     res.send(doc);
    //     console.log(doc);
    //   });
    console.log(req.body);
    const data = req.body.data;
    Customer.find(
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

  getAllCustomers: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    Customer.countDocuments({}, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });

    Customer.find()
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
  
  updateCustomerById: (req, res) => {
    const data = {
      email: req.body.email,
      titleName: req.body.titleName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: `${req.body.titleName} ${req.body.firstName} ${req.body.lastName}`,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      county: req.body.county,
      street: req.body.street,
      zipCode: req.body.zipCode,
      homePhone: req.body.homePhone,
      workPhone: req.body.workPhone,
      cellNumber: req.body.cellNumber,
    };
    Customer.findByIdAndUpdate(req.body._id, data, (err, doc) => {
      if (!err) {
        // console.log(user);

        res.json({ success: true });
      }
    });
  },
};

module.exports = customer;
