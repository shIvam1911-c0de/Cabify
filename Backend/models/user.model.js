const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSechema = new mongoose.Schema({
    fullName:{
        firstName :{
            type:String,
            required:true,
            minLength: [3, 'first name must be at least 3 character']
        },
        lastName :{
            type:String,
            minLength: [3, 'first name must be at least 3 character']
        },

    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[5, 'email must be at 5']

    },
    password:{
        type:String,
        required:true,
        select:false // using select false jab hum user ko find karenge to user ke pass password nhi show karega

    },
    socketId:{      // socketId is used do that driver driver and user find the live location  of each other
        type:String
    }
})

// create method for jwt 
userSechema.methods.generateAuthToken =  function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

// compare password
userSechema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// hash  password
userSechema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSechema);

module.exports = userModel;



