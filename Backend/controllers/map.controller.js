const mapService = require('../sevices/maps.service');
const {validationResult} = require('express-validator');

module.exports.getCoordinates = async(req, res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: error.array() 
        })
    }
    const {address} = req.query;
    //  console.log(address);

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
        //  console.log(coordinates);

    } catch (error) {
        res.status(500).json({
            message: 'Coordinates Not Found'
        })
        
    }
}

module.exports.getDistanceTime = async(req, res, next)=>{

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {origin, destination} = req.query;
        //  console.log(origin, destination);
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
        // console.log(distanceTime);
        // console.log(distanceTime.distance.value);
        // console.log(distanceTime.duration.value);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error fetching the distance and time'  
        })
        
    }


};

module.exports.getSuggestions = async(req, res, next)=>{
    
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const {input} = req.query;
            const suggestions = await mapService.getSuggestions(input);
            res.status(200).json(suggestions);
            // const descriptions = suggestions.map(place => place.description);
            // console.log(descriptions);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Error fetching the suggestions'  
            })
            
        }
}
