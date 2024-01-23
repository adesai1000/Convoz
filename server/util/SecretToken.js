const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports.createSecretToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_TOKEN,{
        expiresIn: 3 * 24 * 60 * 60,
    } )
}

/*
Generate a random JWT TOKEN
1. Paste this into your terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
*/