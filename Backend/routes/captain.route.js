const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller.js');
const authMiddleware = require("../middlewares/auth.middleware.js"); 


router.post('/register', [
    body('fullName.firstName').isLength({min: 3}).withMessage("First Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Inavlid Email"),
    body('password').isLength({min: 5}).withMessage("Password must be atleast 5 characters long"),
    body('vehicle.color').isLength({min: 3}).withMessage("Color must be atleast 3 characters long"),
    body('vehicle.plate').isLength({min: 3}).withMessage("Plate must be atleast 3 characters long"),
    body('vehicle.capacity').isInt({min: 1}).withMessage("Capacity must be atleast 1"),
    body('vehicle.vehicleType').isIn(['car','motocycle','auto']).withMessage("Invalis Vehicle Type")
],
captainController.registerCaptain)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body("password").isLength({min:6}).withMessage("password must be 6 character"),
],
captainController.loginCaptain
);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);




module.exports = router;