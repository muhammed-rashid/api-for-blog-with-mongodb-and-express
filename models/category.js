const mongoose = require("mongoose");
const category = mongoose.Schema({
   name:{
    type:String,
    required:true
   }
})
mongoose.model('category',category);