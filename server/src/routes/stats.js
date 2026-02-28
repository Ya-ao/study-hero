const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats');
const auth = require('../middlewares/auth');

router.get('/today', auth, statsController.getToday);
router.get('/recent', auth, statsController.getRecent);
router.get('/history', auth, statsController.getHistory);
router.get('/achievements', auth, statsController.getAchievements);
router.get('/record/:id', auth, statsController.getRecordById);

module.exports = router;
