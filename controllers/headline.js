const request = require('request');
const cheerio = require('cheerio');

const headline = require('../models/Headline');

exports.initialScrape = function (req, res) {

    const hostName = "https://www.naturalnews.com/";
    
    let initialScrapeArray = [];

    request(hostName, function (error, response, html) {

        if (error) console.log(error);

        const $ = cheerio.load(html);

        $("div.IFB").each(function (i, element) {
            // Save the text and href of each link enclosed in the current element
            let date = $(element).children("div.IFA").children("time.entry-time").text();
            let title = $(element).children("div.IFH").children("a").text();
            let author = $(element).children("div.IFA").children("span.entry-author").children("a").children().text();
            let imagePath = $(element).children("div.IFP").children("a").children().attr("src");
            let description = $(element).children("div.IFD").find("p").text();
            let link = $(element).children("div.IFH").children("a").attr("href");
            let imageUrl = hostName + imagePath;
            
            let articleData = {
                date: date,
                title: title,
                author: author,
                imageUrl: imageUrl,
                description: description,
                link: link
            };

            initialScrapeArray.push(articleData);
            
            if (date && title && author && imageUrl && description && link) {
                
                headline.create(articleData, function (err, inserted) {
                    if (err) {
                        
                        console.log(err);
                    } else {
                        
                        console.log(inserted + 'HERE --------------------*************');
                    }
                });
            }
        });
        res.json(initialScrapeArray);
    });
    
};