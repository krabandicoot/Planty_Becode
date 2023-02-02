const express = require('express');
const { getPlayers, getAccount } = require('../controllers/playerController');

const router = express.Router();

// GET an account
router.get(`/username/:username`, getAccount);

// GET all players
router.get('/leaderboard', getPlayers);

module.exports = router;