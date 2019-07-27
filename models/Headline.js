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
        scrapeTemplates.naturalNews()
    ])
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));








    // const hostName = "https://www.naturalnews.com/";

    // let initialScrapeArray = []

    // request(hostName, function (error, response, html) {

    //     if (error) console.log(error);

    //     const $ = cheerio.load(html);

    //     $("div.IFB").each(function (i, element) {
    //         // Save the text and href of each link enclosed in the current element
    //         let date = $(element).children("div.IFA").children("time.entry-time").text();
    //         let title = $(element).children("div.IFH").children("a").text();
    //         let author = $(element).children("div.IFA").children("span.entry-author").children("a").children().text();
    //         let imagePath = $(element).children("div.IFP").children("a").children().attr("src");
    //         let description = $(element).children("div.IFD").find("p").text();
    //         let link = $(element).children("div.IFH").children("a").attr("href");
    //         let imageUrl = hostName + imagePath;

    //         let articleData = {
    //             date: date,
    //             title: title,
    //             author: author,
    //             imageUrl: imageUrl,
    //             description: description,
    //             link: link
    //         };


    //         if (date && title && author && imageUrl && description && link) {

    //             initialScrapeArray.push(articleData);

    //             // Headline.create(articleData, function (err, inserted) {
    //             //     if (err) {

    //             //         console.log(err);
    //             //     } else {

    //             //         console.log(inserted + 'HERE --------------------*************');
    //             //     }
    //             // });
    //         }
    //     });
    //     callback(initialScrapeArray);

    // });

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