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

    const { tree_id } = req.params;
    const selectedTree = await Tree.findById(tree_id).exec();
    console.log(tree_id);

    const selectedName = selectedTree.name;
    

    console.log(selectedName);

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
            }, 
            $match: {
                    "name": selectedName 
            }
        }
    ];
    
    const cursor = await Tree.aggregate(pipeline, options).exec();

    // cursor.save();
    res.status(200).json(cursor);
    console.log(cursor);
    
    // cursor.forEach(
    //     function(doc) {
    //         console.log(doc);
    //     },
    //     function(err) {
    //         throw error;        }
    // );
}

module.exports = { 
    createTree, 
    displayComments
};
