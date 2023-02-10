const express = require('express');
//import controllers functions 
const { getTree } = require('../controllers/treeController');

//instance of the express router 
const router = express.Router();

//getAll tree
router.get('/all', getTree);

module.exports = router;