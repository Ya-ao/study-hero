const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topic');

router.get('/hot', topicController.getHotTopics);

module.exports = router;
