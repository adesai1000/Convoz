const User = require("../model/User")
const {createSecretToken} = require("../util/SecretToken")
const bcrpyt = require("bcryptjs")

module.exports.Signup = async(req,res,next) =>{
    try{
        const {email, password, username, createdAt} = req.body;
        const both = await User.findOne({username, email});
        if(both){
            return res.json({message: "Username and Email already exist."})
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({message: "Email already exists."});
        }
        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.json({message: "This username is taken."})
        }
        
        const user = await User.create({email,password,username,createdAt});
        const token = createSecretToken(user._id);
        res.cookie("token", token,{ 
            withCredentials:true,
            httpOnly:true,
        })
        res
        .status(201)
        .json({message: "User created successfully.", success:true, user})
        next();
    }
    catch(error){
        console.log(error)
    }
}

module.exports.Login = async(req,res,next)=>{
    try{
    const { email, password } = req.body;
    if (!email || !password){
        return res.json({message:"All Fields are required"})
    }
    const user = await User.findOne({email});
    if(!user){
        return res.json({message:"Email is incorrect"})
    }
    const auth = await bcrpyt.compare(password, user.password)
    if(!auth){
        return res.json({message:"Password is incorrect"})
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token,{
        withCredentials: true,
        httpOnly: false,
    })
    res.status(202).json({message:"User logged in successfully", success:true});
    next()
    }
    catch(error){
    console.log(error)
    }
}