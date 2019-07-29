const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function() {
const hostName = 'https://www.zerohedge.com/';
const result = await rp(hostName)
    .then(html => {
        let data = [];
        const $ = cheerio.load(html);
        $("div.views-row").each(function (i, element) {
            // Save the text and href of each link enclosed in the current element
            let date = $(element).children("article").children("footer").children("ul").children("li.extras__created").children("span").text();
            let title = $(element).children("article").children("h2").children("a").children("span").text();
            let imagePath = $(element).children("article").children("section").children("div.teaser-image").children("div").children("a").children("picture").children("img").attr("src");
            let description = $(element).children("article").find("section").children("div.teaser-text").children("div").children("p").text();
            let linkUrl = $(element).children("article").children("h2").children("a").attr("href");
            let link = hostName + linkUrl;

            let articleData = {
                date: date,
                title: title,
                author: 'zerohedge',
                imageUrl: imagePath,
                description: description,
                link:link
            };
            

            if (date && title && imagePath && description && link) {

                data.push(articleData);
            }
        });
        return data;

    })
    .catch(err => console.log(err));
return result;
}