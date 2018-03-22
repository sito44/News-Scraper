

const HeadlineModel = require('../models/Headline');




exports.scrapeNews = function (req, res) {
     HeadlineModel.schema.statics.scrape(function(response) {
       res.json(response)
     });

};