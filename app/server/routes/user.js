const express = require('express');
const { signInUser, signUpUser, signOutUser } = require('../controllers/userController');
const router = express.Router();

// Signin route
router.post('/signin', signInUser);
// Signup route
router.post('/signup', signUpUser);
// Signout route
router.get('/signout', signOutUser);

module.exports = router;