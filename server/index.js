const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute")
const app = express();
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


app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
)

app.use(cookieParser());


app.use(express.json());

app.use("/", authRoute)