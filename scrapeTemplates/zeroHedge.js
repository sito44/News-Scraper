const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function() {
const hostName = 'zerohedge';
const webAddress = `https://www.${hostName}.com/`;
const result = await rp(webAddress)
    .then(html => {
        let data = [];
        const $ = cheerio.load(html);
        $("div.views-row").each(function (i, element) {
            
            let date = $(element).children("article").children("footer").children("ul").children("li.extras__created").children("span").text();
            let title = $(element).children("article").children("h2").children("a").children("span").text();
            let imagePath = $(element).children("article").children("section").children("div.teaser-image").children("div").children("a").children("picture").children("img").attr("src");
            let description = $(element).children("article").find("section").children("div.teaser-text").children("div").children("p").text();
            let linkUrl = $(element).children("article").children("h2").children("a").attr("href");
            let link = webAddress + linkUrl.slice(1);
            

            let articleData = {
                domain: hostName,
                date: date,
                title: title,
                author: 'zerohedge',
                category: 'Geopolitics | Finance',
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