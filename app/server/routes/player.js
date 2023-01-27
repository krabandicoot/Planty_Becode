const express = require('express');
const {getAccount, getPlayers} = require('../controllers/playerController');

const router = express.Router();
// GET an account
router.get('/:username', getAccount);

// GET all players
router.get('/leaderboard', getPlayers);

module.exports = router;