const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Olx = require("../models/olx");
const productModel = {
  name: "",
  image: "",
  price: "",
};

const olx = {
  product: (req, res) => {
    axios({
      method: "get",
      url: `https://www.olx.com.pk/items/q-${req.body.name.toLowerCase()}`,
    }).then((response) => {
      var productArray = [];
      var imageArray = [];
      var priceArray = [];

      var data = [];

      var dom = new JSDOM(response.data);
      dom.window.document.querySelectorAll("span._2tW1I").forEach((link) => {
        productArray.push(link.innerHTML);
      });
      dom.window.document.querySelectorAll("span._89yzn").forEach((link) => {
        priceArray.push(link.innerHTML);
      });
      dom.window.document.querySelectorAll("figure._2grx4").forEach((link) => {
        imageArray.push(link.innerHTML.split('<img src="')[1].split('"')[0]);
      });

      for (let index = 0; index < imageArray.length; index++) {
        // data[
        //   index
        // ] = `${productArray[index]}#${priceArray[index]}#${imageArray[index]}`;

        var data = {
          name: productArray[index],
          image: imageArray[index].split(';')[0],
          price: priceArray[index],
          itemType: req.body.name, 
        };


        // Olx.create(data, (err, success) => {
        //   if (!err) console.log(success);
        // });
        Olx.findOneAndUpdate(
          { image: productModel.image},
          data,
          { upsert: true, useFindAndModify: false },
          (err, data) => {
            console.log("data inserted");
          }
        );
      }

      //   console.log(data);
      res.send(data);
    });
  },
  fetchData:(req, res)=>{
    Olx.find({itemType:req.body.name}, (err, data)=>{
      res.send(data);
    })
  }
};

module.exports = olx;
