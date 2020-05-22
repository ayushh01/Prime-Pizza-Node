const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('../config/auth');
const Order = require('../models/order');

const OrderRouter = express.Router();


OrderRouter.route('/')
.get(auth.ensureAuthenticated,(req,res,next)=>{
    Order.find({email:req.user.email})
    .then((user)=>{
        res.render('myorder',{'myorder':user});
    })
})


.post(auth.ensureAuthenticated,(req,res,next)=>{
    Order.create(req.body)
    .then((order)=>{
        res.redirect('/myorder');
    })
})

module.exports = OrderRouter;