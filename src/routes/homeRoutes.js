const { Router } = require('express');
const router = Router();

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { redirectToHome, homeView } = require('../controllers/homeController');

// home
router.get('/', redirectToHome);
router.get('/inicio', homeView);

module.exports = router;
