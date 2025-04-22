const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to find the address');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching the coordinates');
    }
};


module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        // const data = response.data;
        if(response.data.status === 'OK'){

            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No route found');
            }
            return response.data.rows[0].elements[0];
        }else{
            throw new Error('Unable to find the distance and time');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching the distance and time');
    }
};

module.exports.getSuggestions = async (input) => {
    if(!input){
        throw new Error('query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        // const data = response.data;

        if(response.data.status === 'OK'){
            return response.data.predictions;
        }else{
            throw new Error('Unable to find the suggestions');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching the suggestions');
    }

};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
    
    

    console.log("Finding captains within:", radius, "KM of", { latitude: ltd, longitude: lng });

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ lng, ltd], radius / 6371]
            }
        }
    });

    return captains;
};

