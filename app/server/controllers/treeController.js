const Tree = require('../models/treeModel');
const Player = require('../models/playerModel');

// -------- Get Tree
const getTree = async (req, res) => {
    try {
        const trees = await Tree.find({}).sort({ value: -1 });

        res.status(200).json(trees);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// -------- Show the tree's comment
const displayComments = async (req, res) => {

    try {
        const treename = req.params;
        console.log("This is treename displayComment :", treename);
        const name = treename.name;
        const nameCleaned = name.replaceAll('-', ' ');
        console.log("This is nameCleaned :", nameCleaned);

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
                }
            },
            {
                $match: {
                    "name": nameCleaned
                }
            }
        ];

        const cursor = await Tree.aggregate(pipeline, options).exec();

        res.status(200).json(cursor);
        console.log(cursor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
}

// -------- Get price of a tree
const getPrice = async (req, res) => {

    // Get tree infos :
    const { treename, username } = req.body;
    console.log("This is treename :" + treename);

    const foundTree = await Tree.findOne({ name: treename }).exec();
    console.log("This is foundtree :" + foundTree);

    let price = foundTree.price;

    // Ger player info :
    const player = await Player.findOne({ username: username }).exec();

    if (foundTree.value == "unavailable") {

        // Get owner info :
        const treeOwner = foundTree.owner;

        // Get aryon of 100m : 
        const rayon = 0.1 / 6371;
        const latT = Math.asin(Math.sin(foundTree.lat) / Math.cos(rayon))
        const dLon = Math.acos((Math.cos(rayon) - Math.sin(latT) * Math.sin(foundTree.lat)) / (Math.cos(latT) * Math.cos(foundTree.lat)));

        // Maximum and minimun lon for the 100m radius :
        let maxLat = foundTree.lat + rayon;
        let minLat = foundTree.lat - rayon;
        let maxLon = foundTree.lon + dLon;
        let minLon = foundTree.lon - dLon;

        // Get trees in radius : 
        const ownerAroundValue = await Tree.find(
            {
                lat: { $gte: minLat, $lte: maxLat },
                lon: { $gte: minLon, $lte: maxLon },
                owner: treeOwner
            })
            .cursor();

        const aroundValue = await Tree.find(
            {
                lat: { $gte: minLat, $lte: maxLat },
                lon: { $gte: minLon, $lte: maxLon }
            }).exec();

        const playerAroundValue = await Tree.find(
            {
                lat: { $gte: minLat, $lte: maxLat },
                lon: { $gte: minLon, $lte: maxLon },
                owner: player.username
            }).exec();

        // Put them in a array :
        const aroundValueArr = [];
        const playerAroundValueArr = [];
        const ownerAroundValueArr = [];

        for (let i = 0; i < aroundValue.length; i++) {
            aroundValueArr.push(aroundValue[i].price)
        }

        for (let i = 0; i < playerAroundValue.length; i++) {
            playerAroundValueArr.push(playerAroundValue[i].price);
        }

        for (let i = 0; i < ownerAroundValue.length; i++) {
            ownerAroundValueArr.push(ownerAroundValue[i].price);
        }

        // Calculate the sum of all :
        let totalPlayerAroundValue = 1;
        let totalOwnerAroundValue = 1;

        if (ownerAroundValueArr.length) {
            totalOwnerAroundValue = ownerAroundValueArr.reduce(function (a, b) {
                return a + b;
            });
        };

        for (let i = 0; i < playerAroundValueArr.length; i++) {
            totalPlayerAroundValue = playerAroundValueArr.reduce(function (a, b) {
                return a + b;
            });
        };

        const totalAroundValue = aroundValueArr.reduce(function (a, b) {
            return a + b;
        });

        if (ownerAroundValueArr.length == 0) {
            ownerAroundValueArr.length += 1;
        }

        let price = foundTree.price + ((totalOwnerAroundValue) * ((aroundValueArr.length) / (ownerAroundValueArr.length))) + (totalAroundValue) - (totalPlayerAroundValue);

        res.status(200).json(price);

    } else if (foundTree.value == "locked") {
        res.status(200).send("Sorry, this tree is locked !");
    } else {
        res.status(200).json(price);
    }
}

// -------- Buy a tree
const buyTree = async (req, res) => {
    // Get tree info
    const { treename, username } = req.body;
    const foundTree = await Tree.findOne({ name: treename }).exec();
    //Get user info
    const player = await Player.findOne({ username: username }).exec();
    const money = player.leafs;
    // Get base price
    let price = foundTree.price;

    if (foundTree.value == "unavailable") {
        // Get owner info
        const treeOwner = foundTree.owner;

        // Calculate a rayon
        const rayon = 0.1 / 6371;
        const latT = Math.asin(Math.sin(foundTree.lat) / Math.cos(rayon))
        const dLon = Math.acos((Math.cos(rayon) - Math.sin(latT) * Math.sin(foundTree.lat)) / (Math.cos(latT) * Math.cos(foundTree.lat)));

        // Maximum and minimun lon for the 100m radius
        let maxLat = foundTree.lat + rayon;
        let minLat = foundTree.lat - rayon;
        let maxLon = foundTree.lon + dLon;
        let minLon = foundTree.lon - dLon;

        // Get trees in radius : 
        const ownerAroundValue = await Tree.find(
            {
                lat: { $gte: minLat, $lte: maxLat },
                lon: { $gte: minLon, $lte: maxLon },
                owner: treeOwner
            })
            .exec();

        const aroundValue = await Tree.find(
            {
                lat: { $gte: minLat, $lte: maxLat },
                lon: { $gte: minLon, $lte: maxLon }
            }).exec();

        const playerAroundValue = await Tree.find(
            {
                lat: { $gte: minLat, $lte: maxLat },
                lon: { $gte: minLon, $lte: maxLon },
                owner: player.username
            }).exec();

        // Put them in a array :
        const aroundValueArr = [];
        const playerAroundValueArr = [];
        const ownerAroundValueArr = [];

        for (let i = 0; i < aroundValue.length; i++) {
            aroundValueArr.push(aroundValue[i].price)
        }

        for (let i = 0; i < playerAroundValue.length; i++) {
            playerAroundValueArr.push(playerAroundValue[i].price);
        }

        for (let i = 0; i < ownerAroundValue.length; i++) {
            ownerAroundValueArr.push(ownerAroundValue[i].price);
        }

        // Calculate the sum of all :
        let totalPlayerAroundValue = 1;
        let totalOwnerAroundValue = 1;

        if (ownerAroundValueArr.length) {
            totalOwnerAroundValue = ownerAroundValueArr.reduce(function (a, b) {
                return a + b;
            });
        };

        for (let i = 0; i < playerAroundValueArr.length; i++) {
            totalPlayerAroundValue = playerAroundValueArr.reduce(function (a, b) {
                return a + b;
            });
        };

        const totalAroundValue = aroundValueArr.reduce(function (a, b) {
            return a + b;
        });

        if (ownerAroundValueArr.length == 0) {
            ownerAroundValueArr.length += 1;
        }

        price = foundTree.price + ((totalOwnerAroundValue) * ((aroundValueArr.length) / (ownerAroundValueArr.length))) + (totalAroundValue) - (totalPlayerAroundValue);
    }

    const newAmount = money - price;

    if (price > money && foundTree.value !== "locked") {
        res.status(204).json("Sorry, you're broke !");
    } else if (price <= money && foundTree.value !== "locked") {
        // buy
        const updateTree = await Tree.updateOne(
            { name: treename },
            {
                $set:
                {
                    value: "unavailable",
                    owner: player.username
                }
            });
        const updatePlayer = await Player.updateOne(
            { username: username },
            {
                $set:
                {
                    leafs: newAmount
                }
            });

        res.status(200).json({ updateTree, updatePlayer });
    } else {
        res.status(204).json("Sorry, this tree is locked !");
    }
}

// -------- Get lock price
const getLockPrice = async (req, res) => {
    const { treename } = req.body;
    const foundTree = await Tree.findOne({ name: treename }).exec();
    const username = foundTree.owner;
    const player = await Player.findOne({ username: username }).exec();

    // Get radius : 
    const rayon = 0.1 / 6371;
    const latT = Math.asin(Math.sin(foundTree.lat) / Math.cos(rayon))
    const dLon = Math.acos((Math.cos(rayon) - Math.sin(latT) * Math.sin(foundTree.lat)) / (Math.cos(latT) * Math.cos(foundTree.lat)));

    // Maximum and minimun lon for the 100m radius
    let maxLat = foundTree.lat + rayon;
    let minLat = foundTree.lat - rayon;
    let maxLon = foundTree.lon + dLon;
    let minLon = foundTree.lon - dLon;

    // Get trees in radius : 
    const aroundValue = await Tree.find(
        {
            lat: { $gte: minLat, $lte: maxLat },
            lon: { $gte: minLon, $lte: maxLon }
        }).exec();

    const playerAroundValue = await Tree.find(
        {
            lat: { $gte: minLat, $lte: maxLat },
            lon: { $gte: minLon, $lte: maxLon },
            owner: player.username
        }).exec();

    // Put them in a array :
    const aroundValueArr = [];
    const playerAroundValueArr = [];

    for (let i = 0; i < aroundValue.length; i++) {
        aroundValueArr.push(aroundValue[i].price)
    }

    for (let i = 0; i < playerAroundValue.length; i++) {
        playerAroundValueArr.push(playerAroundValue[i].price);
    }

    // Calculate the sum of all :
    let totalPlayerAroundValue = 1;

    for (let i = 0; i < playerAroundValueArr.length; i++) {
        totalPlayerAroundValue = playerAroundValueArr.reduce(function (a, b) {
            return a + b;
        });
    };

    const totalAroundValue = aroundValueArr.reduce(function (a, b) {
        return a + b;
    });

    // Get lock price :
    const lockPrice = (foundTree.price * 10) + ((totalAroundValue) * (playerAroundValueArr.length)) - ((totalPlayerAroundValue) / (playerAroundValueArr.length));

    res.status(200).json(lockPrice);
}

// -------- Lock a tree
const lockTree = async (req, res) => {

    const treename = req.params;
    const name = treename.name;
    const nameCleaned = name.replaceAll('-', ' ');
    const foundTree = await Tree.findOne({ name: nameCleaned }).exec();
    const username = foundTree.owner;
    const player = await Player.findOne({ username: username }).exec();
    const money = player.leafs;

    if (foundTree.value == "locked") {
        console.log("This tree is already locked !");
    }

    // Get radius : 
    const rayon = 0.1 / 6371;
    const latT = Math.asin(Math.sin(foundTree.lat) / Math.cos(rayon))
    const dLon = Math.acos((Math.cos(rayon) - Math.sin(latT) * Math.sin(foundTree.lat)) / (Math.cos(latT) * Math.cos(foundTree.lat)));

    // Maximum and minimun lon for the 100m radius
    let maxLat = foundTree.lat + rayon;
    let minLat = foundTree.lat - rayon;
    let maxLon = foundTree.lon + dLon;
    let minLon = foundTree.lon - dLon;

    // Get trees in radius : 
    const aroundValue = await Tree.find(
        {
            lat: { $gte: minLat, $lte: maxLat },
            lon: { $gte: minLon, $lte: maxLon }
        }).exec();

    const playerAroundValue = await Tree.find(
        {
            lat: { $gte: minLat, $lte: maxLat },
            lon: { $gte: minLon, $lte: maxLon },
            owner: player.username
        }).exec();

    // Put them in a array :
    const aroundValueArr = [];
    const playerAroundValueArr = [];

    for (let i = 0; i < aroundValue.length; i++) {
        aroundValueArr.push(aroundValue[i].price)
    }

    for (let i = 0; i < playerAroundValue.length; i++) {
        playerAroundValueArr.push(playerAroundValue[i].price);
    }

    // Calculate the sum of all :
    let totalPlayerAroundValue = 1;

    for (let i = 0; i < playerAroundValueArr.length; i++) {
        totalPlayerAroundValue = playerAroundValueArr.reduce(function (a, b) {
            return a + b;
        });
    };

    const totalAroundValue = aroundValueArr.reduce(function (a, b) {
        return a + b;
    });

    // Get lock price :
    const lockPrice = (foundTree.price * 10) + ((totalAroundValue) * (playerAroundValueArr.length)) - ((totalPlayerAroundValue) / (playerAroundValueArr.length));

    if (lockPrice <= money) {

        const newAmount = money - lockPrice;

        // Lock the tree
        const updateTree = await Tree.updateOne(
            { name: nameCleaned },
            {
                $set:
                {
                    value: "locked",
                    owner: player.username
                }
            });

        const updatePlayer = await Player.updateOne(
            { username: player.username },
            {
                $set:
                {
                    leafs: newAmount
                }
            });

        res.status(200).json({ updateTree, updatePlayer });
    } else {
        res.status(204).json("Sorry, you're too broke !");
    }
}

// -------- Unlock tree :
const unlockTree = async (req, res) => {

    const treename = req.params;
    const name = treename.name;
    const nameCleaned = name.replaceAll('-', ' ');
    const foundTree = await Tree.findOne({ name: nameCleaned }).exec();
    const username = foundTree.owner;
    const price = foundTree.price;
    const player = await Player.findOne({ username: username }).exec();
    const money = player.leafs;

    const updateTree = await Tree.updateOne(
        { name: nameCleaned },
        {
            $set:
            {
                value: "unavailable"
            }
        });

    const newAmount = price + money;

    const updatePlayer = await Player.updateOne(
        { username: player.username },
        {
            $set:
            {
                leafs: newAmount
            }
        });

    res.status(200).json((updateTree, updatePlayer));
}

// Export all functions :
module.exports = {
    getTree,
    displayComments,
    getPrice,
    buyTree,
    getLockPrice,
    lockTree,
    unlockTree
};