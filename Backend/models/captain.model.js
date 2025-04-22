
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type:String,
            required:true,
            minLength: [3, 'firstName must be at least 3 characters']
        },

        lastName:{
            type:String,
            minLength: [3, 'lastName must be at least 3 characters']
        }

    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password:{
        type:String,
        required:true,
        delect:false
    },

    socketId:{
        type:String
    },

    status:{
        type:String,
        enum:['active', 'inactive'],
        default:'active'
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minLength: [3, 'Color must be at least 3 characters']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3, 'plate nust be atleast 3 characters']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1, 'capacity nust be atleast 3']

        }, vehicleType:{
            type:String,
            required:true,
            enum:['car', 'motorcycle', 'auto']
        }
    }, 
    location: {
        type: { type: String, enum: ["Point"], default: "Point" }, // Required for GeoJSON
        coordinates: { type: [Number], default: [0, 0] } 
        // ltd:{
        //     type:Number
        // },
        // lng:{
        //     type:Number
        // }
    }    
});

captainSchema.methods.generateAuthToken =  function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

// compare password
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// hash  password
captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captainModel', captainSchema);

module.exports = captainModel;
