const express = require('express');
//import controllers functions 
const { getTree, displayComments } = require('../controllers/treeController');

//instance of the express router 
const router = express.Router();

//getAll tree
router.get('/all', getTree);

router.get(`/:name`, displayComments);

module.exports = router;