const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function () {
    const hostName = 'https://themindunleashed.com/';
    const result = await rp(hostName)
        .then(html => {
            let data = [];
            const $ = cheerio.load(html);
            $("div.article-card").each(function (i, element) {
                // Save the text and href of each link enclosed in the current element
                
                
                let title = $(element).children("h3").children("a").text();
                let imagePath = $(element).children().first().next().children("div").children("img").attr("data-cfsrc");
                let description = $(element).children("p").find("a").text();
                let link = $(element).children("a").attr("href");

                let articleData = {
                    title: title,
                    imageUrl: imagePath,
                    description: description,
                    link: link
                };
                
                if (title && description && link && imagePath) {

                    data.push(articleData);
                }
            });
            return data;

        })
        .catch(err => console.log(err));
    return result;


}