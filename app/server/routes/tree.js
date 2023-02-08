const express = require('express');
const { createTree } = require('../controllers/treeController');
const router = express.Router();

router.get(`/createdb`, createTree);

module.exports = router;