const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Pasta = require('../models/pasta');


const pastaRouter = express.Router();

pastaRouter.use(bodyParser.json());

pastaRouter.route('/')
.get((req,res,next)=>{
    Pasta.find({})
    .then((pasta)=>{
        res.render('pasta',{'pasta':pasta});
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Pasta.create(req.body)
    .then((pasta)=>{
        console.log("Dish created :", pasta)
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(pasta);
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

//pasta selected
pastaRouter.route('/:pastaId')
.get((req,res,next)=>{
    Pasta.findById(req.params.pastaId)
    .then((pasta)=>{
        console.log(pasta)
        res.render('selectedpasta',{'pas':pasta});
    },(err)=> next(err))
    .catch((err)=>next(err));
})

module.exports = pastaRouter;