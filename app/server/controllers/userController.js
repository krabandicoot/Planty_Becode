const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN = process.env.NODE_TOKEN;

// Function to generate a token in the signin and signup user 
const createToken = (_id) => {
    return jwt.sign({ _id }, TOKEN, { expiresIn: '3d' });
}


// -------- Login user 
const signInUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.signin(username, password);

        const signInToken = createToken(user._id);
        res.cookie('planty', signInToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        res.status(200).json({ username, signInToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// -------- Signup user 
const signUpUser = async (req, res) => {
    const { username, email, password, color } = req.body;

    try {

        const user = await User.signup(username, email, password, color);

        // Create token :
        const signInToken = createToken(user._id);
        res.status(200).json({ email, signInToken });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// -------- Sign out
const signOutUser = async (req, res) => {
    res.cookie('jwt', 'expiredtoken');
    res.json("User successully log out");
}

// Export all the functions : 
module.exports = {
    signInUser,
    signUpUser,
    signOutUser
};
