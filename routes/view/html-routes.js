const express = require('express');
const router = express.Router();

const fetch = require('../../controllers/fetch.js');

router.get('/', fetch.renderHeadlines);

router.get('/saved-articles', fetch.renderSavedHeadlines);

module.exports = router;