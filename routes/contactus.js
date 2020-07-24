const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, (req, res, next) => res.render("contact"));

module.exports = router;
