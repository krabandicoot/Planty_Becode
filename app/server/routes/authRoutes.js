const express = require('express');
const router = express.Router();

//import controllers functions 
const {signInUser, signUpUser} = require('../controllers/authController');
//Signin route
//post because we are sending data to location
router.post('/signin', ()=>{}); 
//Signup route
router.post('/signup', ()=>{}); 

//Reset Password route 

module.exports = router; 