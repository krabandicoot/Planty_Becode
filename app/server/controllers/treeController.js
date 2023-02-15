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

    // Get tree infos : 
    const treename = req.params;
    const name = treename.name;
    const nameCleaned = name.replaceAll('-',' ');
    const foundTree = await Tree.findOne({ name : nameCleaned }).exec();
    const price = foundTree.price;

    // Ger player info :
    const username = req.body.username;
    const player = await Player.findOne({ username : username}).exec();

    // Get owner info :
    const treeOwner = foundTree.owner; 
    const owner = await Player.findOne({name: treeOwner}).exec();

    if (foundTree.value == "unavailable"){

        const rayon = 0.1/6371;
        const latT = Math.asin(Math.sin(foundTree.lat)/Math.cos(rayon))
        const dLon = Math.acos((Math.cos(r) - Math.sin(latT) * Math.sin(foundTree.lat)) / (Math.cos(latT)*Math.cos(foundTree.lat)))

        // Maximum and minimun lon for the 100m radius
        let maxLat = foundTree.lat + rayon;
        let minLat = foundTree.lat - rayon;
        let maxLon = foundTree.lon + dLon;
        let minLon = foundTree.lon - dLon;

        // Get trees in radius : 
        const ownerAroundValue = await Tree.find(
            {lat:{$gte: minLat, $lte: maxLat }, 
            lon: {$gte: minLon, $lte: maxLon }, 
            owner: owner.username})
            .exec();

        const aroundValue = await Tree.find(
            {lat:{$gte: minLat, $lte: maxLat }, 
            lon: {$gte: minLon, $lte: maxLon } }).exec();

        const playerAroundValue = await Tree.find(
            {lat:{$gte: minLat, $lte: maxLat }, 
            lon: {$gte: minLon, $lte: maxLon }, 
            owner: player.username}).exec()
        ;

        // Put them in a array :
        for(let i = 0; i < aroundValue.length; i++) {
            aroundValueArr.push(aroundValue[i].price)
        }

        for(let i = 0; i < playerAroundValue.length; i++) {
            playerAroundValueArr.push(playerAroundValue[i].price);
        }

        for(let i = 0; i < ownerAroundValue.length; i++){
            ownerAroundValueArr.push(ownerAroundValue[i].price);
        }

        // Calculate the sum of all :
        const totalAroundValue = aroundValueArr.reduce(function(a, b){
            return a + b;
        });

        const totalPlayerAroundValue = playerAroundValueArr.reduce(function(a, b){
            return a + b;
        });

        const totalOwnerAroundValue = ownerAroundValueArr.reduce(function(a, b){
            return a + b;
        });

        const newPrice = price + ((totalOwnerAroundValue) * (totalAroundValue) / (totalOwnerAroundValue)) + (totalAroundValue) - (totalPlayerAroundValue);

        return price = newPrice;

    } else if (foundTree.value == "locked") {

        res.status(200).send("Sorry, this tree is locked !");

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

    const newAmount = money - price;
    console.log(newAmount);

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

        const updatePlayer = await Player.updateOne(
            { username: player.username},
            {$set:
                {
                    leafs : newAmount
                }
            }
        );

        return updateTree, updatePlayer;
    } else {
        res.status(204).send("Sorry, you're broke !");
    }
}

module.exports = { 
    getTree, 
    displayComments,
    getPrice,
    buyTree
};

