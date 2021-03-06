const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const pastaSchema = new Schema({
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

var Pasta = mongoose.model('Pasta',pastaSchema);

module.exports = Pasta; 