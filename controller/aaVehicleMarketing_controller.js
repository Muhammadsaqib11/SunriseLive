const AAVehiclesMarketing = require("../models/aavehicle_marketing");
const fs = require("fs");

const aaVehiclesMarketing = {
  addMarketingData: (req, res) => {
    console.log(req.body);
    const marketing = new AAVehiclesMarketing(req.body);
    marketing.save((err, doc) => {
      if (err) return res.status(400).json({ error: err.message });
      if (doc) {
        res.status(200).json({ success: true, doc });
      }
    });
  },
  // function to add image and video to the marketing folder in server....................
  addMarketingContent: (req, res) => {
    let mdata = req.files === null ? null : req.files.file.data;
    // console.log(req.files)
    // console.log(req.files.file.mimetype.split("/")[1]);
    // // console.log(mdata)
    if (mdata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");
      fs.writeFile(
        `public/marketing/${req.files.file.name}${
          req.body.entity === "image" ? ".png" : ".mp4"
        }`,
        // "public/marketing/" + req.files.file.name + ".png",
        buff,
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ success: true });
          }
        }
      );
    }
    if (mdata === null) {
      res.json({ success: false, message: "no image file to Save" });
    }
  },
  updateMarketingContent: (req, res) => {
    if (
      req.body._id && (req.body.entity === "images" ||
      req.body.entity === "videos")
    ) {
      const entity = req.body.entity;
      AAVehiclesMarketing.findByIdAndUpdate(
        { _id: req.body._id },
        {
          $addToSet: {
            [entity]: entity === "images" ? req.body.images : req.body.videos,
          },
        },
        { useFindAndModify: false }
      ).exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        if (doc) {
          res.json({ success: true });
        }
      });
    } else {
      res.json({ message: "Missing Some values" });
    }
  },
  deleteMarketingContent: (req, res) => {
    handleDelete(req, res);
  },

  deleteMarketingData: (req, res) => {
    if (req.body._id) {
      AAVehiclesMarketing.findByIdAndDelete(req.body._id).exec((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true });
        if (doc) {
          doc.images.map((img) => {
            fs.unlink("public/marketing/" + img, function (err) {
              if (err && err.code == "ENOENT") {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
              } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
              } else {
                console.info(`removed`);
              }
            });
          });
          doc.videos.map((img) => {
            fs.unlink("public/marketing/" + img, function (err) {
              if (err && err.code == "ENOENT") {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
              } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
              } else {
                console.info(`removed`);
              }
            });
          });
        } else {
          res.status(400).json({ error: err.message });
        }
      });
    } else {
      res.status(400).json({ error: err.message });
    }
  },

  getContentByVehicleId: (req, res) => {
    // console.log(req)
    if (req.query._id) {
      AAVehiclesMarketing.findOne({ vehicle_id: req.query._id })
        .populate("vehicle_id")
        .exec((err, doc) => {
          if (err) return res.status(400).json({ error: err.message });
          if (doc) {
            res.json({ success: true, content: doc });
          }
        });
    } else {
      res.json({ error: "Missing Some Values" });
    }
  },
  getAllMarketingContent: (req, res) => {
    AAVehiclesMarketing.find({})
      .populate("vehicle_id")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ error: err });
        if (doc) {
          res.json({ success: true, contents: doc });
        }
      });
  },
};

module.exports = aaVehiclesMarketing;
const handleDelete = (req, res) => {
  fs.unlink("public/marketing/" + req.body.name, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
      res
        .status(400)
        .json({ err: err, message: "File doesn't exist, won't remove it." });
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
      res.json({
        err: err,
        message: "Error occurred while trying to remove file",
      });
    } else {
      console.info(`removed`);
      res.json({ err: false, success: true, message: "Success" });
    }
  });
};



