const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model.js");
const blacklistToken = require("../models/blacklistToken.model.js");




module.exports.authUser = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized User'});
    }

    // this is used so that after logout no one get the token so update the token after logout
    const isBlacklisted = await blacklistToken.findOne({ token: token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized User'});
    }

    try{
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    }catch(error){
        return res.status(401).json({message: 'Unauthorized User'});


    }
}

module.exports.authCaptain = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized Captain'});
    }

    // this is used so that after logout no one get the token so update the token after logout
    const isBlacklisted = await blacklistToken.findOne({ token: token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized Captain'});
    }

    try{
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;

        return next();

    }catch(error){
        return res.status(401).json({message: 'Unauthorized Captain'});


    }
}