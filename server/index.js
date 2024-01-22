const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to Mongo DB");
    app.listen(3000,()=>{
        console.log("Server is running on Port 3000.")
    })
})
.catch((error)=>{
    console.log(error);
})

app.get('/', (req,res)=>{
    res.send("API is running properly.")
})