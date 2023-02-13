const express = require('express');
const { createTree, displayComments } = require('../controllers/treeController');
const router = express.Router();

router.get(`/createdb`, createTree);

router.get(`/:name`, displayComments);

module.exports = router;