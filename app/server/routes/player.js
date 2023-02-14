const express = require('express');
const { getPlayers, getAccount, updatePlayer, deletePlayer, displayTrees } = require('../controllers/playerController');

const router = express.Router();

// GET an account
router.get(`/username/:username`, getAccount);

// GET all players
router.get('/leaderboard', getPlayers);

// Update a player
router.patch(`/username/:username`, updatePlayer);

// Delete a player
router.delete('/username/:username', deletePlayer);

//display the player trees
router.get('/username/tree/:username', displayTrees);

module.exports = router;