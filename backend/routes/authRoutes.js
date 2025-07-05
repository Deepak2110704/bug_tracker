
//express - HTTP server framework
//sending request from the client 
// receiving response from a server

const express = require('express');

const { registerUser, login } = require('../controllers/authController');

//create a new router instance
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

//Export the router to use in the main app
module.exports = router;