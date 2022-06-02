const Signature = require("../models/signature");
const fs = require("fs");
var path = require("path");
const signature = {
  createSignature: (req, res) => {
    // console.log(req.files.file.name);
    // console.log(req.body.signature);
    const signature= req.body.signature
    // var imagedata = req.files.file.data;
    if(signature !== undefined){
      Signature.create({ signature: req.body.signature }, (err, data) => {
        if (!err) {
          res.send(data);
        }
      });
      // console.log('check')
    }else{
    var imagedata = req.files.file.data;
    console.log(imagedata)
    let buff = new Buffer.from(imagedata, "base64");
    // var dated = getdate();
    // var named = dated + value;
    // var named = value;
    fs.writeFile("public/" + req.files.file.name, buff, function (err) {
      if (err) throw err;

      Signature.create({ signature: req.files.file.name }, (err, data) => {
        if (!err) {
          res.send(data);
        }
      });
      console.log("Saved!");
    });
    tempbody[element] = named;
  }
  },
  getSignature: (req, res) => {
    console.log(req.body);
    Signature.findOne({ _id: req.body.id }, (err, data) => {
      // console.log(data.signature);

      var obj = {
        img: {
          data: fs.readFileSync(path.join(`public/${data.signature}`)),
          contentType: "image/png",
        },
      };
      // res.send(obj);
      // console.log(obj)

      var img = obj.img.data.toString('base64');
      res.send(img);
      // console.log(obj);
    });
  },
};

module.exports = signature;

// function getFilesForPC(hkeyArray, files, body) {
// 	var tempbody = body;
// 	if (files != null) {
// 		var data = files;
// 		hkeyArray.forEach((element) => {
// 			var obj = body[element];
// 			if (obj.includes(files.name)) {
// 				body[element] = files.name;
// 				var value = body[element];
// 				var imagedata = files.data;
// 				let buff = new Buffer.from(imagedata, 'base64');
// 				var dated = getdate();
// 				var named = dated + value;
// 				fs.writeFile('public/' + named, buff, function (err) {
// 					if (err) throw err;
// 					console.log('Saved!');
// 				});
// 				tempbody[element] = named;
// 			}
// 		});
// 		return tempbody;
// 	} else {
// 				return body;
// 	}
// }
