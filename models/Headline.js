const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = require('mongodb')
const scrapeTemplates = require('../scrapeTemplates/index.js');

const headlineSchema = new Schema({

    date: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        unique: true
    },

    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: true
    }],
    saved: {
        type: Boolean,
        required: true,
        default: false
    }
});


headlineSchema.statics.scrape = function (callback) {

    Promise.all([
        scrapeTemplates.naturalNews(),
        scrapeTemplates.zeroHedge(),
        scrapeTemplates.theMindUnleashed(),
        scrapeTemplates.newsAtlas()
    ])
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));

};

headlineSchema.statics.dbQuery = function (callback) {
    Headline.find({saved: false}, function (err, news) {
        if (err) {
            console.log(err);
        } else {
            callback(news);
        }
    });
};

headlineSchema.statics.dbQuerySavedNotes = function (callback) {
    Headline.find({
        saved: true
    }, function (err, savedArticles) {
        if (err) {
            console.log(err);
        } else {
            callback(savedArticles);
        }
    });
}

headlineSchema.statics.saveArticle = function (articleId, callback) {
    Headline.findByIdAndUpdate(articleId, { saved: true }, callback);
}

headlineSchema.statics.deleteArticle = function (articleId, callback) {
    Headline.findByIdAndUpdate(articleId, { saved: false }, callback);
}
/* headlineSchema.statics.dbQuerySavedNotes = function (callback) {
    Headline.find({ saved: true })
        .populate('notes')
        .then((headlines) => {
            callback(null, headlines);
        })
        .catch(err => callback(err))
}  */

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;