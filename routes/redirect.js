const express = require('express');
const router = express.Router();

const auth = require('../config/auth');

router.get('/', (req,res,next)=>
    res.redirect('/users/login')
);

module.exports = router;