var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
    url: 'http://rsiworkshop.avc-livestock.com/',
    consumerKey: 'ck_30ec8b0b23b963bb0712c119bb805d432d76b56d',
    consumerSecret: 'cs_8ce4c5593714f5a005bef8a048eabdc349cd4805',
    wpAPI: true,
    version: 'wc/v3'
  });

  module.exports = WooCommerce;