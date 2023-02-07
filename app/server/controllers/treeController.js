const Tree = require('../models/treeModel');

const createTree = async (req, res) => {
    try {
        const tree = await Tree.createDB();
        res.status(200).json("sucessfully created")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createTree };
