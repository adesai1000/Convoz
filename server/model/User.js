const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "You need to choose a username."],
        unique: true,
    },
    email:{
        type:String,
        required: [true, "You need to give your email address."],
        unique: true
    },
    password:{
        type:String,
        required:[true, "You need to choose a passoword."]
    },
    isVip:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default: new Date(),
    },
});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model ("User", userSchema);