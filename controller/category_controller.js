const Category = require("../models/category");
const fs = require("fs");

const categoryObj = {
    // addNewcustomer
  addNewCategory: (req, res) => {
    // const displayName = `${req.body.titleName} ${req.body.firstName} ${req.body.lastName}`;
    // console.log("req", req.body)

    const category = new Category({ ...req.body });
    console.log("category", category)
    category.save((err, user) => {
      if (!err) {
        // console.log("user", user);
        res.send({success:true , message:'Category Created Successfully'});
      }
    });
  },

  addCategoryImage: (req, res) => {
    // console.log("req", req)
    let mdata = req.files === null ? null : req.files.file.data;
    console.log(req.files)
    console.log(req.files.file.mimetype.split("/")[1]);
    // console.log(mdata)
    if (mdata !== null) {
      let buff = new Buffer.from(req.files.file.data, "base64");

      fs.writeFile(
        `public/product/${req.files.file.name}`,
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

  getCategory: (req, res) => {

    console.log(req.body);
    const data = req.body.data;
    Category.find(
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

  getAllCategories: (req, res) => {
    const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;

    let count = 0;

    Category.countDocuments({}, function (err, docCount) {
      if (err) {
        return handleError(err);
      } //handle possible errors
      console.log("docCount", docCount);
      count = docCount;
      //and do some other fancy stuff
    });

    Category.find()
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
  
  updateCategoryById: (req, res) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      parentCategory: req.body.parentCategory,
      image: req.body.image,

    };
    Category.findByIdAndUpdate(req.body._id, data, (err, doc) => {
      if (!err) {
        // console.log(user);

        res.json({ success: true, message :"Category Updated Successfully" });
      }
    });
  },
};

module.exports = categoryObj;
