const express = require('express');
//import controllers functions 
const { signInUser, signUpUser, signOutUser } = require('../controllers/userController');

//instance of the express router 
const router = express.Router();

//Signin route
router.post('/signin', signInUser);
//Signup route
router.post('/signup', signUpUser);
//Signout route
// router.get('/signout', signOutUser);

module.exports = router; 