//jshint esversion:6
const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/routes");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");



const startServer = () => {
  app.use(cors({ origin: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use(express.static(path.join(__dirname, "./build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build"));
  });

  app.use(express.json());
  app.use(fileUpload({ createParentPath: true }));

  app.use(router);
  var port = process.env.PORT || 3001;
  app.listen(port, function () {
    console.log(`Server started on port ` + port);
  });
};

module.exports = startServer;
