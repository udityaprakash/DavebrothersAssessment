//requiring all the packages
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//local database
const dburllocalhost = "mongodb://localhost:27017/Davebrother";

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

//designing schema of database
const DashboardSchema = new mongoose.Schema({
    page:String,
    totalsales:{
        type:mongoose.Types.Decimal128
        },
    totalorders:Number,
    totalproducts:Number,
    totalcustomers:Number,
    salesanalystics:{
        monday:Number,
        tuesday:Number,
        wednesday:Number,
        thursday:Number,
        friday:Number,
        saturday:Number,
        sunday:Number,
    },
    latestOrders:{
        OrderID:Array,
        customer:Array,
        Status:Array,
        Total:Array
    },
    latestsearchItems:{
        keyword:Array,
        result:Array,
        hits:Array
    },
    latestreviews:{
        product:Array,
        customer:Array,
        ratings:Array
    }
});

//creating collection
const db = new mongoose.model('Davebrothertest',DashboardSchema);


//sample Data
const demo = {
    page:"Dashboard",
    totalsales:236365.54,
    totalorders:1531,
    totalproducts:125,
    totalcustomers:485,
    salesanalystics:{
        monday:0,
        tuesday:850,
        wednesday:0,
        thursday:0,
        friday:0,
        saturday:0,
        sunday:0,
    },
    latestOrders:{
        OrderID:[3764,3423,2342,3244,2344],
        customer:["test data","test data","test data","test data","test data"],
        Status:["pending","pending","pending","pending","pending",],
        Total:[819,43,34,212,234]
    },
    latestsearchItems:{
        keyword:["skirt1","skirt2","skirt3","skirt4","skirt5",],
        result:[8,43,6,1,56],
        hits:[1,676,34,45,344]
    },
    latestreviews:{
        product:["shampoo"],
        customer:["ujjwal"],
        ratings:[4]
    }
};


//Saving the sample Data
app.get("/",async (req,res)=>{
    const data = new db(demo);

    await data.save().then((r)=>{
        res.json(
            {
                status:"success",
                msg:"Recorded"
            }
        );
    }).catch((err)=>{
        res.json({
            status:"Failure",
            msgerr:err,
            msg:"Not Been Recorded"
        })
    });
});

//sending the data or sample data
app.get("/Dashboard",async (req,res)=>{
    let result;
    try{
        result = await db.findOne({page:"Dashboard"});
        console.log(result);
        res.status(200).json(result);

    }catch{

        res.json({
            sample:demo,
            msg:"false Data"
        });
    }
});


//setting up to listen on port
app.listen(3000 ,()=>{
    console.log("server started");
});