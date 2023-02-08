const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const Player = require('../models/playerModel');
const Comment = require('../models/commentModel');

// const getUserInfo = async (req, res) => {
//     let cookie = req.cookie["planty"];
//     console.log(cookie);

//     let cookiePostman = req.headers

    // if(!cookie){
    // // Read the token
    // function parseJwt (token) {
    //     return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    // }}
// };

// Create a comment
const createComment = async (req, res) => {
    const comment = new Comment();
    const { username, text } = req.body;
    const { tree_id } = req.params;
    getUserInfo();

    if (!username || !text) {
        return res.json({
        success: false,
        error: 'You must provide an author and comment'
        });
    }

    comment.username = username;
    comment.text = text;
    comment.tree_id = tree_id;

    comment.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
}

// Export all the function
module.exports = { 
    createComment
};