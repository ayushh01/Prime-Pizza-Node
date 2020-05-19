const express = require('express');
const router = express.Router();

const auth = require('../config/auth');
const pizza = require('../models/pizza');
const pasta = require('../models/pasta');
router.get('/', auth.ensureAuthenticated, (req,res,next)=>
    pizza.find({})
    .then((pizza)=>{
        pasta.find({})
        .then((pasta)=>{
            res.render('home' , { 'name': req.user.name , 'pizza': pizza , 'pasta':pasta });
        })
       
    })
   
);

module.exports = router;