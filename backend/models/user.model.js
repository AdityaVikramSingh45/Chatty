const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    profilePic:{
        type: String,
        default: ""
    }
}, {timestamps: true}); // Adds createdAt and updatedAt fields automatically


const User = mongoose.model("User", userSchema);

module.exports = User;