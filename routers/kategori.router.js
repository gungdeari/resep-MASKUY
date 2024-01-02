const { Router } = require('express');
const KategoriController = require('../controller/kategoriController');
const router = Router();

router.get('/kategori/:namaKategori', KategoriController.index);

module.exports = router;