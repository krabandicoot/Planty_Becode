const express = require('express');
const { getPlayers, getAccount, updatePlayer } = require('../controllers/playerController');

const router = express.Router();

// GET an account
router.get(`/username/:username`, getAccount);

// GET all players
router.get('/leaderboard', getPlayers);

// Update a player
router.patch(`/username/:username`, updatePlayer);

module.exports = router;