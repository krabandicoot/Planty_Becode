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
    
    let options = {
        allowDiskUse: false
    };
    
    let pipeline = [
        {
            "$lookup": {
                "from": "comments",
                "localField": "treeName",
                "foreignField": "name",
                "as": "comments"
            }
        }
    ];
    
    let cursor = Tree.aggregate(pipeline, options);
    
    cursor.forEach(
        function(doc) {
            console.log(doc);
        }, 
        function(err) {
            client.close();
        }
    );
}

module.exports = { 
    createTree, 
    displayComments
};
