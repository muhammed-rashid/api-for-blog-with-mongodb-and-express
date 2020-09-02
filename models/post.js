const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const post = mongoose.Schema({
    title:{
        type:String,
        required : true,
    },
    discription:{
        type:String,
        required : true,
    },
    imgurl:{
        type:String,
        required : true,
    },
    likes:{
        type:Number,
        required:true
    },
    isfeatured:{
        type:Boolean,
        default:false
    },
    category:{
        type: ObjectId,
        ref:"category"
    }
   

});
mongoose.model('post',post);