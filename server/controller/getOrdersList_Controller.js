
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const AAVehiclesParts = require("../models/aavehicles_parts");
var WooCommerceAPI = require("woocommerce-api");

const api = new WooCommerceRestApi({
  url: "https://rsiworkshop.avc-livestock.com/",
  consumerKey: "ck_30ec8b0b23b963bb0712c119bb805d432d76b56d",
  consumerSecret: "cs_8ce4c5593714f5a005bef8a048eabdc349cd4805",
  version: "v3",
  ssl: true,
});

var WooCommerce = new WooCommerceAPI({
  url: "http://rsiworkshop.avc-livestock.com/",
  consumerKey: "ck_30ec8b0b23b963bb0712c119bb805d432d76b56d",
  consumerSecret: "cs_8ce4c5593714f5a005bef8a048eabdc349cd4805",
  wpAPI: true,
  version: "wc/v3",
});

const orders = {
   GetOrders :async (req, res) => {
    WooCommerce.getAsync(`orders`).then(function(result) {
        rorders = JSON.parse(result.toJSON().body);
        orders.modifyOrders(rorders).then((asbc)=> {
          //asbc.modification_status = "modiied";
          res.send(asbc);
        })    
        //console.log(data,orders)
      });
  },
 modifyOrders  :async (orders2) => {
  orders2 && orders2.map((order) => {
    order.line_items && order.line_items.map((item) => {
      // item.address = getPartAddress(item.sku)
        orders.modifyOrders2(item.sku).then((doc)=> {
          // console.log(doc)
          item.address_phy = doc || "No address"
        })
    })
  })
  return orders2
 },
 modifyOrders2  :async (sku) => {
  if (sku.match(/^[0-9a-fA-F]{24}$/)) {
    console.log("sku", sku)
    AAVehiclesParts.findOne({_id:sku}).populate({
      path: "subBin_id",
      select: "no",
      populate : {
        path: "bin_id",
        select: "no",
        populate: {
          path: "shelf_id",
          select: "no",
          populate: {
            path: "rack_id",
            select: "no",
            populate: {
              path: "warehouse_id",
              select: "no",
            },
          },
        },
      },
    }).exec((err, doc) => {
        console.log(doc)
        return doc
      });
    }
 },
  GetOrdersByStatus :async (req, res) => {
    WooCommerce.getAsync(`orders/?status=${req.body.status}`).then(function(result) {
        res.send(JSON.parse(result.toJSON().body));
      });
  },

  GetOrdersById: (req, res) => {
    console.log("req", req.body.id);
    WooCommerce.getAsync(`orders/${req.body.id}`).then(function (result) {
      res.send(JSON.parse(result.toJSON().body));
    });
  },

  UpdateOrder: (req, res) => {
    
    
    const data = {
      status: req.body.status
    };
    WooCommerce.putAsync(`orders/${req.body.id}`, data).then(function(result) {
      console.log("result", result)
    return res.send(JSON.parse(result.toJSON().body));
    });
  }
}
  module.exports = orders;
