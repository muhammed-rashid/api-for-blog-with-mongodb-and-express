const express = require("express");
const mongoose = require("mongoose");

const {MONGOURI} = require("./keys");
const app =express();
const port = 8080;

//connection with mongoo

mongoose.connect(MONGOURI,{ useNewUrlParser: true ,
    useUnifiedTopology: true
});

mongoose.connection.on('error', err => {
    logError(err);
  });
mongoose.connection.on('connected',()=>{
    console.log("connectd to db")
})

//model import
require("./models/post");
require("./models/category");

app.use(express.json());

//import routes

app.use(require("./routes/post"));

app.use(require("./routes/category"));











app.listen(port,()=>{
    console.log("connected tyo server")
})