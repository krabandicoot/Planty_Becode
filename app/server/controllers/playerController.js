const { default: mongoose } = require('mongoose');
const Player = require('../models/playerModel');
const getUser = require('../models/userModel');

// Get all info of a player
const getAccount = async(req,res) => {
    const { username } = req.params;
    const player = await Player.findOne({username: username}).select('-password');

    try {
        if(!player){
            throw Error(`This username doesn't exist`);
        }
        
        res.status(200).json(player);
        return player;
    
    } catch(error) {

        res.status(400).json({error: error.message});
    
    }
}

// Get all players in a list
const getPlayers = async(req,res) => {
    try {
    const players = await Player.find({}).sort({leafs: -1});

    res.status(200).json(players);

    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Update the player
const updatePlayer = async (req, res) => {
    const { username } = req.params;

    const player = await Player.findOne({username: username});
    const User = await getUser.findOne({username: username});

    const updatePlayer = await Player.updateOne({username: username}, {$set: req.body});
    const UpdateUser = await getUser.updateOne({username: username}, {$set: req.body});

    try {

        if (!req.body) {
            throw error("This can not be empty!");
        } else if(!player) {
                throw Error(`This username doesn't exist`);
        }

        res.status(200).json(updatePlayer);
        res.status(200).json(UpdateUser);
    
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Delete the player
const deletePlayer = async (req, res) => {
    const { username } = req.params;
    const player = await Player.findOne({username: username});
    const deletePlayer = await Player.deleteOne({username: username});

    try {

        if(!player) {
                throw Error(`This username doesn't exist`);
        }

        res.status(200).json(deletePlayer);
        console.log('The player has been deleted');
    
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Export all the function
module.exports = { 
    getAccount,
    getPlayers,
    updatePlayer,
    deletePlayer
};