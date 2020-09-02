const express= require("express");

const router = express.Router();
const mongoose = require("mongoose");
const post = mongoose.model("post");
const category = mongoose.model("category");


router.get('/post',(req,res)=>{
    post.find().populate("category","_id name")
    .then((posts)=>{
        res.json({posts});
    }).catch((error)=>{
        console.log(error);
    });
});

router.post("/add-post",(req,res)=>{
    const {title,discription,imgurl,ncategory,likes,isfeatured } = req.body;
    console.log(title);
    console.log(discription);
    console.log(imgurl);
    console.log(ncategory);
    

    if(!title || !discription || !imgurl ||!ncategory||!likes||!isfeatured){
        res.json({error:"all field required"});
    }
    category.findOne({_id:ncategory.id})
    .then((cat)=>{
        const npost = new post({
            title,
            discription,
            imgurl,
            likes,
            isfeatured,
            ncategory:cat,
        });
       npost.save()
        .then(()=>{
            res.json({msg : "post created"});
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((error)=>{
        console.log(error);
    });
   
});


router.get('/trending',(req,res)=>{
    post.find().sort({likes:-1}).populate("category","_id name")
    .then((posts)=>{
        res.json({posts})
    }).catch((err)=>{
        res.send(err)
    });

});

router.get('/fresh',(req,res)=>{
    post.find().sort({_id:-1})
    .limit(3)
    .populate("category","_id name")
    .then((posts)=>{
        res.json({posts})
    }).catch((err)=>{
        res.send(err)
    })

});

router.get('/featured',(req,res)=>{
    post.find({isfeatured:true})
    .populate("category","_id name")
    .then((posts)=>{
        res.json({posts})
    }).catch((err)=>{
        res.send(err)
    })

})
router.delete('/deletepost/:id',(req,res)=>{
    post.remove({_id:req.params.id}).then((posts)=>{
        res.json({posts})
    })
   
   
})

router.patch('/update/:id',(req,res)=>{
    post.updateOne({_id:req.params.id},
        {$set:{title:req.body.title}})
        .then((posts)=>{
        res.json({posts})
    })
   
   
})









module.exports = router;