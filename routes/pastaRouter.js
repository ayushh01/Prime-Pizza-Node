const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Pasta = require('../models/pasta');
const auth = require('../config/auth');

const pastaRouter = express.Router();

pastaRouter.use(bodyParser.json());

pastaRouter.route('/')
.get(auth.ensureAuthenticated,(req,res,next)=>{
    Pasta.find({})
    .then((pasta)=>{
        res.render('pasta',{'pasta':pasta});
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.post(auth.ensureAuthenticated,(req,res,next)=>{
    Pasta.create(req.body)
    .then((pasta)=>{
        console.log("Dish created :", pasta)
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(pasta);
    },(err)=> next(err))
    .catch((err)=>next(err));
})

.put(auth.ensureAuthenticated,(req,res,next)=>{
    res.statusCode = 403;
    res.end("Put is not for /dishes");
})

.delete(auth.ensureAuthenticated,(req,res,next)=>{
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
.get(auth.ensureAuthenticated,(req,res,next)=>{
    Pasta.findById(req.params.pastaId)
    .then((pasta)=>{
        Pasta.find({publisher:pasta.publisher})
        .then((pass)=>{
            if(pass.length>3) {
                res.render('selectedpasta',{'name': req.user.name ,'email':req.user.email ,'pas':pasta , 'pass':pass});
            }
            else
            {
                Pasta.find({})
                .then((pass)=>{
                    res.render('selectedpasta',{'name': req.user.name ,'email':req.user.email ,'pas':pasta , 'pass':pass});
                })
            }
        })
    },(err)=> next(err))
    .catch((err)=>next(err));
})

module.exports = pastaRouter;