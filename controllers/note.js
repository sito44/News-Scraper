
const HeadlineModel = require('../models/Headline');

exports.savedNews = function (req, res) {
    HeadlineModel.schema.statics.dbQuerySavedNotes(function(response) {
        res.json(response)
    });

};