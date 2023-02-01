const express = require('express');
const { getPlayers} = require('../controllers/playerController');

const router = express.Router();

// GET an account
// router.get('/user:username', getAccount);

// GET all players
router.get('/leaderboard', getPlayers);

module.exports = router;