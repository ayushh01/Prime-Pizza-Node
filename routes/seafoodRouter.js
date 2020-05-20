const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Seafood = require('../models/seafood');


const SeaFoodRouter = express.Router();

SeaFoodRouter.use(bodyParser.json());

SeaFoodRouter.route('/')
.get((req,res,next)=>{
    Seafood.find({})
    .then((seafood)=>{
        res.render('seafood',{'seafood':seafood});
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Seafood.create(req.body)
    .then((seafood)=>{
        console.log("Dish created :", seafood)
        res.json(seafood);
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("Put is not for /dishes");
})

.delete((req,res,next)=>{
    Seafood.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})


//seafood selected
SeaFoodRouter.route('/:seafoodId')
.get((req,res,next)=>{
    Seafood.findById(req.params.seafoodId)
    .then((seafood)=>{
        Seafood.find({publisher:seafood.publisher})
        .then((seaf)=>{
            if(seaf.length>3) {
                console.log(seaf);
            res.render('selectedseafood',{'sea':seafood ,'seaf':seaf });
            }
            else
            {
                Seafood.find({})
                .then((seaf)=>{
                    res.render('selectedseafood',{'sea':seafood ,'seaf':seaf });
                })
            }
        })
    },(err)=> next(err))
    .catch((err)=>next(err));
})


module.exports = SeaFoodRouter;