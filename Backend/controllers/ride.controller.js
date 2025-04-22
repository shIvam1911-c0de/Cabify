const rideService = require('../sevices/ride.service');
const {validationResult} = require('express-validator');
const {query} = require('express-validator');
// const getCaptainInTheRadius = require('../sevices/maps.service');
// const getCoordinates = require('../sevices/maps.service');
const mapService = require('../sevices/maps.service'); // ✅ Correctly import the service
const {sendMessageToSocketId} = require("../socket"); // ✅ Correctly import the function
const rideModel = require('../models/ride.model');




module.exports.createRide = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {userId,  pickup, destination, vehicleType} = req.body;
    try {

        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 50);

        // remove otp
        ride.otp = "";
        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

        // console.log("req._id", req.user._id, ride._id);

        // console.log("rideWithUser controller ", rideWithUser);

        // send message / notifications to all the captains in the radius
        captainsInRadius.map(captain => {

            // console.log("captain and ride", captain._id, ride);
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            })
        })

        // console.log("ride controller " , ride);



        return res.status(201).json({ride});

        


        // pickup person  ke  location ke time jitne bhi captains hain unko find krna hai
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}  

module.exports.getFare = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {pickup, destination} = req.query;
    console.log(pickup, destination);
    try {
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json(fare);
        console.log(fare);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.confirmRide = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {rideId} = req.body;
    console.log("rideId", rideId);
    // Ensure captain exists

    try {
        const ride = await rideService.confirmRide({rideId, captain:req.captain});
        console.log("ride Confirmed", ride); 

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

module.exports.startRide = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }  

    const {rideId, otp} = req.query;
    console.log("rideId", rideId, otp);
    
    try{
        const ride = await rideService.startRide({rideId, otp, captain:req.captain})

        console.log("ride started", ride);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
    
    
}

module.exports.endRide = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }  

    const {rideId} = req.body;
    
    try{
        const ride = await rideService.endRide({rideId, captain:req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
    
    
}