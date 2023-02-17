const express = require('express');
//import controllers functions 
const { getTree, 
    displayComments,
    getPrice, 
    buyTree, 
    lockTree, 
    unlockTree,
    getLockPrice } = require('../controllers/treeController');

//instance of the express router 
const router = express.Router();

// GET all tree
router.get('/all', getTree);

// GET a tree and his comments
router.get(`/:name`, displayComments);

// GET price of a tree
router.get(`/price/:name`, getPrice);

// Buy a tree
router.get(`/buy/:name`, buyTree);

// GET price to lock the tree
router.get(`/lockprice/:name`, getLockPrice)

// Lock the tree
router.get(`/lock/:name`, lockTree);

// Unlock the tree
router.get('/unlock/:name', unlockTree);

module.exports = router;