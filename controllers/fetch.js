const HeadlineModel = require('../models/Headline');

exports.renderHeadlines = function (req, res) {
    HeadlineModel.schema.statics.dbQuery(function(response){
    res.render('home', {
        newsData: response
    });
});
};