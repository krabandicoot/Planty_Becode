const express = require('express');
const { createComment } = require('../controllers/commentController');

const router = express.Router();

// POST a comment
router.post(`/create/:name`, createComment);

module.exports = router;