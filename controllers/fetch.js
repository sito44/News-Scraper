const HeadlineModel = require('../models/Headline');

exports.renderHeadlines = function (req, res) {
    HeadlineModel.schema.statics.dbQuery(function(response){
    res.render('home', {
        newsData: response
    });
});
};

exports.renderSavedHeadlines = function (req, res) {
    HeadlineModel.schema.statics.dbQuerySavedNotes(function (response, err) {
        if (err) { console.log(err) }

        res.render('saved', {
            newsData: response
        });
    });
};