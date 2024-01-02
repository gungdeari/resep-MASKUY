const express = require('express');
const router = express.Router();
const SearchController = require('../controller/searchController');

router.get('/search', SearchController.index);

module.exports = router;
