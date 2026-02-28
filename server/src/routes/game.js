const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game');
const auth = require('../middlewares/auth');

router.post('/questions', auth, gameController.generateQuestions);
router.post('/submit', auth, gameController.submit);

module.exports = router;
