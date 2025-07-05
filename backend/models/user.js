const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},//requires a name field
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    role:{
        type: String,
        enum: ['admin','developer','tester'],
        defualt: 'tester'//defualt role is 'user'
    },
});

module.exports = mongoose.model("User", userSchema);