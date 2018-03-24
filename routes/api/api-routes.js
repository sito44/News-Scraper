const express = require('express');
const router = express.Router();

const headline = require('../../controllers/headline');
const note = require('../../controllers/note');


router.get('/api/initial-scrape', headline.scrapeNews);

router.get('/api/saved-articles', note.savedNews);

router.put('/api/save-article', headline.saveArticle);

router.put('/api/delete-article', headline.deleteArticle);

module.exports = router;