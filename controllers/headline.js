const HeadlineModel = require('../models/Headline');

exports.scrapeNews = function (req, res) {
  HeadlineModel.schema.statics.scrape(function (response) {
    
    res.json(response);
  });

};

exports.saveArticle = function (req, res) {
  const articleId = req.body;

  console.log(articleId.id);
  HeadlineModel.schema.statics.saveArticle(articleId.id, function (response) {
    res.send('test' + response);
  });
}

exports.deleteArticle = function (req, res) {
  const articleId = req.body;

  console.log(articleId.id);
  HeadlineModel.schema.statics.deleteArticle(articleId.id, function (response) {
    res.send('test' + response);
  });
}