const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const passport = require('passport');


//model
const User = require('../models/User');

//Signup
router.get('/register',(req,res,next)=>{
    errors = [];
    res.render('register', {'errors':errors});
})

router.post('/register',(req,res,next)=>{
    const { name , email , password ,password2 } = req.body;
    let errors = [];

    //check required field
    if(!name || !email || !password || !password2 )
    {
        errors.push({msg:'Please fill in all  fields'});
    }

    //check passwords match
    if(password != password2)
    {
        errors.push({msg:'Passwords do not match' });
    }

    if(password.length < 6)
    {
        errors.push({msg:'Password should have atleast 6 characters'});
    }
    if(errors.length > 0)
    {
        res.render('register',{'errors':errors})
    }
    else
    {
        User.findOne({ email:email})
        .then((user)=>{
            if(user)
            {
                errors.push({msg:'Email is already Registered'});
                res.render('register',{'errors':errors});
            }
            else
            {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //bcrypt 
                bcrypt.genSalt(10, (err,salt) =>
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg','You are now registered , log In')
                            res.redirect('/users/login');
                        })
                        .catch(err=>console.log(err));
                    }))
            }
        });
    }
})

//Login
router.get('/login',(req,res,next)=>{  
    res.render('login');
})

router.post('/login', (req,res,next)=>{
    passport.authenticate('local', {
        successRedirect:'/home',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next);
}); 


//Logout
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
})


module.exports = router;