const User = require('../models/userModel');

//login user 
const signInUser = async(req, res) => {
    res.json({message: 'User sucessfully signed in ! ✅'});
}
//signup user 
const signUpUser = async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.signup(email, password);

        res.status(200).json({email, user});
    }catch(error){
        res.status(400).json({error: error.message});
    }
    res.json({message: 'User sucessfully signed up ! ✅'});
}

module.exports = { signInUser, signUpUser};