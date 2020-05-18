const express = require('express');
const router = express.Router();

const auth = require('../config/auth');

router.get('/', auth.ensureAuthenticated, (req,res,next)=>
    res.render('home' , { 'name': req.user.name})
);

module.exports = router;