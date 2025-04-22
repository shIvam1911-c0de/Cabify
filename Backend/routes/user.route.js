const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js"); 




router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({min:3}).withMessage("FirstName should be at least 3 characters"),
    body('password').isLength({min:6}).withMessage("password should be at least 6 characters"),
],
userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body("password").isLength({min:6}).withMessage("password must be 6 character"),
],
userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);


module.exports = router;