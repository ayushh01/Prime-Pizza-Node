const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const seafoodSchema = new Schema({
   publisher:{
       type:String,
       required:true
   },
   title:{
        type:String,
        required:true
    },
    source_url:{
        type:String,
        default:''
    },
    recipe_id:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true
    },
    social_rank:{
        type:Number,
        required:true
    },
    publisher_url:{
        type:String,
        required:true
    },


});

var Seafood = mongoose.model('Seafood',seafoodSchema);

module.exports = Seafood; 