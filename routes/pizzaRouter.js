const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Pizzas = require('../models/pizza');


const pizzaRouter = express.Router();

pizzaRouter.use(bodyParser.json());

pizzaRouter.route('/')
.get((req,res,next)=>{
    Pizzas.find({})
    .then((pizza)=>{
        console.log(pizza)
        res.render('pizza' , { 'pizzas': pizza });
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Pizzas.create(req.body)
    .then((pizza)=>{
        console.log("Dish created :", pizza)
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(pizza);
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("Put is not for /dishes");
})

.delete((req,res,next)=>{
    Pizzas.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports = pizzaRouter;