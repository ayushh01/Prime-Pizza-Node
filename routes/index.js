const router = require("express").Router();

const { ensureAuthenticated } = require("../config/auth");
const pizza = require("../models/pizza");
const pasta = require("../models/pasta");
const seafood = require("../models/seafood");

router.get("/", ensureAuthenticated, (req, res, next) =>
  pizza.find({}).then((pizza) => {
    pasta.find({}).then((pasta) => {
      seafood.find({}).then((seafood) => {
        res.render("home", { pizza: pizza, pasta: pasta, seafood: seafood });
      });
    });
  })
);

module.exports = router;
