const Tree = require('../models/treeModel');
const Player = require('../models/playerModel');

// Get Tree
const getTree = async(req,res) => {
    try {
    const trees = await Tree.find({}).sort({value: -1});

    res.status(200).json(trees);

    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

//Show the tree's comment
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

// Get price of a tree
const getPrice = async(req,res) => {
    const treename = req.params;
    const name = treename.name;
    const nameCleaned = name.replaceAll('-',' ');
    const foundTree = await Tree.findOne({ name : nameCleaned }).exec();

    const price = foundTree.price;

    if (foundTree.value == "unavailable"){

        // [value of the targetted tree] + ([value of all the targetted player's trees in 100m radius] × ([amount of trees in 100m radius] / [amount of tree of targetted player in 100m radius])) + [value of all the other players trees in 100m radius] - [value of all your tree in 100m radius]

    } else if (foundTree.value == "locked") {

    } else {
        return price;
    }
}

// Buy a tree
const buyTree = async(req,res) => {
    const treename = req.params;
    const username = req.body.username;
    const name = treename.name;
    const nameCleaned = name.replaceAll('-',' ');
    const foundTree = await Tree.findOne({ name : nameCleaned }).exec();
    const player = await Player.findOne({ username : username}).exec();

    const money = player.leafs;

    const price = foundTree.price;

    if (price <= money) {
        
        // buy
        const updateTree = await Tree.updateOne(
            {name: nameCleaned}, 
            {$set: 
                {
                    value: "unavailable",
                    owner: player.username
                }
            });

        // const updatePlayer = await Player.updateOne(
        //     { username: player.username},
        //     {$set:
        //         {
        //             leafs :
        //         }
        //     }
        // );

        return updateTree, updatePlayer;
    } else {
        console.log("Sorry, you're broke !");
    }
}

module.exports = { 
    getTree, 
    displayComments,
    getPrice,
    buyTree
};

