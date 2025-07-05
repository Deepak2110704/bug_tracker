
//import express

const express = require("express");

const dotenv = require("dotenv");
//import connect db - to connect to mongodb
const cors = require("cors");
const connectDB = require("./config/db");


dotenv.config();//load environment variable from .env file to process

connectDB();//connect to mongodb

//create an express app

const app = express();

app.use(cors() );
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

const PORT =  process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
