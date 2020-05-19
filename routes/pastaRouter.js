const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Pasta = require('../models/pasta');


const pastaRouter = express.Router();

pastaRouter.use(bodyParser.json());

pastaRouter.route('/')
.get((req,res,next)=>{
    Pasta.find({})
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(dishes);
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Pasta.create(req.body)
    .then((dish)=>{
        console.log("Dish created :", dish)
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(dish);
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("Put is not for /dishes");
})

.delete((req,res,next)=>{
    Pasta.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports = pastaRouter;