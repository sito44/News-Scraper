const express = require('express');
const router = express.Router();

const headline = require('../../controllers/headline');

router.get('/api/initial-scrape', headline.scrapeNews);

module.exports = router;