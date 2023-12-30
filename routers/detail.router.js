const { Router } = require('express');
const DetailController = require('../controller/detailController');
const router = Router();

router.get('/detail/:id', DetailController.index)

module.exports = router;