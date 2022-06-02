const Schedule = require("../models/schedule");

const schedule = {

  addNewschedule: (req, res) => {
    const status = "Pending";
    const schedule = new Schedule({ ...req.body, status });
    console.log(req.body);
    schedule.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
  },

  getAllschedules: (req, res) => {
    // const skip = parseInt(req.query.skip);
    // const limit = parseInt(req.query.limit);
    const order = req.query.order;

    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    Schedule.countDocuments(
      { $and: [{ status: "Pending" }] },
      function (err, docCount) {
        if (err) {
          return handleError(err);
        } //handle possible errors
        console.log("docCount", docCount);
        count = docCount;
        //and do some other fancy stuff
      }
    );

    Schedule.find({ $and: [{ status: "Pending" }] })
      .skip(skip)
      .sort({ _id: order })
      .limit(size)
      .populate(
        "customer",
        "firstName lastName email country state city county street zipCode homePhone workPhone cellNumber"
      )
      .populate("vehicle", "year make model subModel VIN")
      .populate({
        path: "user",
        select: "email firstName lastName",
        populate: {
          path: "locations",
          select:
            "email phoneNumber country address state city street zipCode ",
        },
      })
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({ doc: doc, totalDoc: count });
        console.log(doc);
      });
  },
  
  scheduleUpdate: (req, res) => {
    console.log(req.body._id);
    const date1 = Date(req.body.date);
    console.log(date1);

    Schedule.findOneAndUpdate(
      { _id: req.body._id },
      { date: req.body.date },

      (err, data) => {
        if (!err) {
          // console.log(data)
          res.send(data);
        }
      }
    );
  },
};

module.exports = schedule;
