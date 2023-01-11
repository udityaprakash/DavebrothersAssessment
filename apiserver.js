//requiring all the packages
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//local database
const dburllocalhost = "mongodb://localhost:27017";

//online database
const dburl = "mongodb+srv://udityaprakash01:sAMc1FmiB4wWnxAx@cluster0.za5wk8j.mongodb.net/?retryWrites=true&w=majority";


//Connecting to database in such a way that app does not crashes if connection was not successful
function connecttodatabase(){

    mongoose.connect(
        // dburl,
        dburllocalhost,
         (err) => {   
        if (!err) {
            console.log("database was connected successfully");
        } else {
            console.log("Retrying to connect database");
            connecttodatabase();
        }
    });
}

connecttodatabase();

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"success"
    })
});


app.listen(3000 ,()=>{
    console.log("server started");
});