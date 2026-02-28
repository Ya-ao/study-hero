const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/login', userController.login);
router.get('/info', auth, userController.getInfo);
router.put('/info', auth, userController.updateInfo);

module.exports = router;
