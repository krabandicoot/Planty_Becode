const Comment = require('../models/commentModel');
const Tree = require('../models/treeModel');

// -------- Create a comment
const createComment = async (req, res) => {
    const comment = new Comment();
    const { username, text } = req.body;
    const treename = req.params;
    const name = treename.name;
    const nameCleaned = name.replaceAll('-',' ');
    const foundTree = await Tree.findOne({ name : nameCleaned }).exec();

    if (!username || !text) {
        return res.json({
        success: false,
        error: 'You must provide an author and comment'
        });
    }

    // Add the different fields to the comment collection
    comment.username = username;
    comment.text = text;
    comment.treeInfo.treeName = foundTree.name;
    comment.treeInfo.tree_id = foundTree._id;

    // Save the comment
    comment.save();
    res.status(200).json('Comment posted !')
}

// Export all the functions
module.exports = { 
    createComment
};