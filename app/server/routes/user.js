const express = require('express');
    //import controllers functions 
const {signInUser, signUpUser} = require('../controllers/userController');

    //instance of the express router 
const router = express.Router();

//Signin route
router.post('/signin', signInUser); 
//Signup route
router.post('/signup', signUpUser);

module.exports = router; 