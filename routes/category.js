const express= require("express");
const router = express.Router();
const mongoose = require("mongoose");
const category = mongoose.model("category");


router.get('/category',(req,res)=>{
    category.find().populate("category","_id name")
    .then((cat)=>{
        res.json({cat});
    })
    .catch((error)=>{
        console.log(error);
    });
});

router.post("/add-category",(req,res)=>{
    const {name }= req.body;
    if(!name){
        res.json({error:"field required"});
    }

    const ncategory = new category({
       name
    });
    ncategory.save()
    .then(()=>{
        res.json({msg : "category created"});
    })
       .catch((err)=>{
        console.log(err);
    });
});





module.exports = router;