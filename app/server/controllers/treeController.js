const Tree = require('../models/treeModel')

// Get Tree
const getTree = async(req,res) => {
    try {
    const trees = await Tree.find({}).sort({value: -1});

    res.status(200).json(trees);

    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getTree };
