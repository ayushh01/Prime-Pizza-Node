const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Pizzas = require('../models/pizza');

const auth = require('../config/auth');

const pizzaRouter = express.Router();

pizzaRouter.use(bodyParser.json());

pizzaRouter.route('/')
.get(auth.ensureAuthenticated,(req,res,next)=>{
    Pizzas.find({})
    .then((pizza)=>{
        console.log(pizza)
        res.render('pizza' , { 'pizzas': pizza });
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.post(auth.ensureAuthenticated,(req,res,next)=>{
    Pizzas.create(req.body)
    .then((pizza)=>{
        console.log("Dish created :", pizza)
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(pizza);
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.put(auth.ensureAuthenticated,(req,res,next)=>{
    res.statusCode = 403;
    res.end("Put is not for /dishes");
})

.delete(auth.ensureAuthenticated,(req,res,next)=>{
    Pizzas.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})


//Pizza selected 


pizzaRouter.route('/:pizzaId')
.get(auth.ensureAuthenticated,(req,res,next)=>{
    Pizzas.findById(req.params.pizzaId)
    .then((pizza)=>{
        Pizzas.find({publisher:pizza.publisher})
        .then((pizz)=>{
            if(pizz.length>3) {
            res.render('selectedpizza',{'name': req.user.name ,'email':req.user.email ,'piz':pizza ,'pizz':pizz });
            }
            else
            {
                Pizzas.find({})
                .then((pizz)=>{
                    res.render('selectedpizza',{'name': req.user.name ,'email':req.user.email ,'piz':pizza ,'pizz':pizz });
                })
            }
        })
    },(err)=> next(err))
    .catch((err)=>next(err));
})

module.exports = pizzaRouter;