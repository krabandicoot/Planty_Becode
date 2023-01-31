const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN = process.env.NODE_TOKEN;

//function to generate a token in the signin and signup user 
const createToken = (_id) => {//id =  is part of the payload of the token 
    return jwt.sign({ _id }, TOKEN, { expiresIn: '3d' });//the second is the secret string only know by the server, the third means the user stays logged in for 3 days before the token expires
}

//login user 
const signInUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.signin(username, password);

        //create token
        const signInToken = createToken(user._id);
        res.status(200).json({ username, signInToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//signup user 
const signUpUser = async (req, res) => {
    const { username, email, password, color } = req.body;

    try {
        const user = await User.signup(username, email, password, color);

        //create token
        const signInToken = createToken(user._id);
        res.status(200).json({ email, signInToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//Sign out user
// const signOutUser = async(req, res)=>{
//     res.cookie('jwt', 'expiredtoken');
// }

module.exports = { signInUser, signUpUser };
