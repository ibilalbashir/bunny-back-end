'use strict';
var app = require('../../server/server')
var randomstring = require("randomstring");

module.exports = function (merchant) {

  merchant.prototype.generateCoupon = function (callback) {
    var couponCode = randomstring.generate(7);
    var coupon = app.models.coupon;
    var m = this;
    coupon.create({
      'code': couponCode,
      'isUsed': false,
      'merchantId': m.id
    }, function (err, succ) {
      if (err) {
        console.log(err);
      }
      console.log(succ);
    })
    // TODO
    callback(null, couponCode);
  };

};
