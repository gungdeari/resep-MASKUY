const { Router } = require('express');
const ArtikelController = require('../controller/artikelController');
const router = Router();

router.get('/artikel/:id', ArtikelController.show)

module.exports = router;