const OrderRouter = require("express").Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../config/auth");
const Order = require("../models/order");

OrderRouter.route("/")
  .get(ensureAuthenticated, (req, res, next) => {
    Order.find({ email: req.user.email }).then((user) => {
      res.render("myorder", { myorder: user });
    });
  })

  .post(auth.ensureAuthenticated, (req, res, next) => {
    Order.create(req.body).then((order) => {
      res.redirect("/myorder");
    });
  });

module.exports = OrderRouter;
