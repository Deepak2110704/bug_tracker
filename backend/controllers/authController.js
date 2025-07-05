//import user model
const User = require("../models/User");

//for hashing passwords
const bcrypt = require('bcryptjs');

//for generating JWT tokens
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    const{name,email,password,role}=req.body;
    try{
        //hash the password
        //two arguments: password entered by user and salt rounds
        // salt rounds(10) determine how many times the password will be hashed
        // higher the salt rounds, more secure the password but also more time it takes to hash
        const hashedPassword = await bcrypt.hash(password, 10);  

        // Create a new user instance
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role:role||'tester',
        });
        //re
        res.status(201).json({
            message: 'User registered successfully',
        });
        // Save the user to the database
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
exports.login=async (req, res) => {
    //get email and password from request body
    const { email, password } = req.body;

    //check if email and password are provided
    //it is important to check if email and password are provided
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
    const user = await User.findOne({ email });

    
    //if user is not found, return 401 Unauthorized
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    //compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        return res.status(401).json({
            message: 'Invalid credentials'
    });
    }

    //generate a JWT token
    //the token will contain the user id and role
    //the token will be signed with a secret key
    //payload of the token will contain user id and role
    //the secret key will be stored in the environment variable JWT_SECRET
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,

    );
    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};