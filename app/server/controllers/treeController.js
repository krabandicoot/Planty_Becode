const Tree = require('../models/treeModel');

const createTree = async (req, res) => {
    try {
        const tree = await Tree.createDB();
        res.status(200).json("sucessfully created")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const displayComments = async (req, res) => {

    const treename = req.params;
    const name = treename.name;
    const nameCleaned = name.replaceAll('-',' ');
    const foundTree = await Tree.findOne({ name : nameCleaned }).exec()

    const options = {
        allowDiskUse: true
    };
    
    const pipeline = [
        {
            $lookup: {
                "from": "comments",
                "localField": "name",
                "foreignField": "treeInfo.treeName",
                "as": "comments"
            }}, 
            {$match: {
                    "name": nameCleaned
            }
        }
    ];

    const cursor = await Tree.aggregate(pipeline, options).exec();

    // cursor.save();
    res.status(200).json(cursor);
    console.log(cursor);
}

module.exports = { 
    createTree, 
    displayComments
};
