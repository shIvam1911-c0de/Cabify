const captainModel = require("../models/captain.model.js");
const captainService = require("../sevices/captain.service.js");
const {validationResult} = require('express-validator');
const authMiddleware = require("../middlewares/auth.middleware.js");
const blacklistToken = require("../models/blacklistToken.model.js");



module.exports.registerCaptain = async(req, res, next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message: "Captain already exist"});
    };

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token, captain});

}



module.exports.loginCaptain = async(req, res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const token = captain.generateAuthToken();

    // when token taken from the cookie then send
    res.cookie("token", token);


    res.status(200).json({token, captain});

}

module.exports.getCaptainProfile = async(req,res, next)=>{
    res.status(201).json(req.captain);

}

module.exports.logoutCaptain = async(req, res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistToken.create({token});

    res.status(200).json({message: "Logged out"});
}

