const { Router } = require('express');
const HomeController = require('../controller/homeController');
const router = Router();

router.get('/', HomeController.index)

module.exports = router;