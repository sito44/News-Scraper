const express = require('express');
const router = express.Router();

const headline = require('../../controllers/headline');

router.get('/', headline.initialScrape);

module.exports = router;