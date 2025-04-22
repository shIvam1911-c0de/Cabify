const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./Db/db");
const userRoute = require("./routes/user.route.js");
const captainRoute = require("./routes/captain.route.js");
const mapRoute = require("./routes/maps.route.js");
const rideRoute = require("./routes/ride.route.js");



connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("hello");
})

app.use("/users", userRoute);
app.use("/captains", captainRoute);
app.use('/maps', mapRoute);
app.use('/rides', rideRoute);


module.exports =  app;