const captainModel = require('../models/captain.model.js');
const rideModel = require('../models/ride.model.js');
const mapService = require('./maps.service');
const crypto = require('crypto');

// create a fare calculation function using distance and time

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and Destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    const baseFare = {
        car: 50,
        auto: 30,
        moto: 20
    };

    const perKmRate = {
        car: 10,
        auto: 5,
        moto: 3
    };

    const perMinuteRate = {
        car: 2,
        auto: 1,
        moto: 0.5
    };

    const fare = {
        car: Math.round(baseFare.car + (distanceTime.distance.value/1000 * perKmRate.car) + (distanceTime.duration.value/60 * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + (distanceTime.distance.value/1000 * perKmRate.moto) + (distanceTime.duration.value/60 * perMinuteRate.moto)),
        auto: Math.round(baseFare.auto + (distanceTime.distance.value/1000 * perKmRate.auto) + (distanceTime.duration.value/60 * perMinuteRate.auto))
    };

    return fare;
}

module.exports.getFare = getFare;

async function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp;

    }
    return generateOtp(num);
}


module.exports.createRide = async({user, pickup, destination, vehicleType})=>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    console.log(fare);
    const otp = await getOtp(6);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: otp,
        fare: fare[vehicleType],
    });

    // console.log("new ride service ", ride);

    return ride;

}

module.exports.confirmRide = async ( {rideId, captain} ) => {
    try {
        if (!rideId ) {
            throw new Error("Ride ID are required");
        }


        await rideModel.findOneAndUpdate(
            { _id: rideId },
            { status: "accepted",  captain: captain._id },
        );


        const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select('+otp');

        if (!ride) {
            throw new Error("Ride not found");
        }

        console.log("Ride Confirmed Successfully:", ride);
        return ride;
    } catch (error) {
        console.error("Error in confirmRide:", error);
        throw new Error("Database error while confirming ride: " + error.message);
    }
};

module.exports.startRide = async({rideId, otp, captain})=>{
    if(!rideId || !otp){
        throw new Error("RideId and Otp are required")
    }

    const ride = await rideModel.findOne({
        _id:rideId
    }).populate("user").populate("captain").select('+otp');

    if(!ride){
        throw new Error("Ride Not Found");
    }

    if(ride.status !== 'accepted'){
        throw new Error("Ride not accepted")
    }

    if(ride.otp !== otp){
        throw new Error("Invlid otp");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'ongoing'
    })

    return ride; 
}


module.exports.endRide = async({rideId, captain})=>{
    if(!rideId){
        throw new Error("RideId is required")
    }

    const ride = await rideModel.findOne({
        _id:rideId,
        captain: captain._id
    }).populate("user").populate("captain").select('+otp');

    if(!ride){
        throw new Error("Ride Not Found");
    }

    if(ride.status !== 'ongoing'){
        throw new Error("Ride not ongoing")
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'completed'
    })

    return ride; 
}



