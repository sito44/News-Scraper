const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function () {
    const hostName = 'sciencealert';
    const webAddress = `https://www.${hostName}.com/`;
    const result = await rp(webAddress)
        .then(html => {
            let data = [];
            const $ = cheerio.load(html);
            $("div.inner").each(function (i, element) {

                let date = $(element).children("div.title-time-container").children("div.time-and-like").children("div.time").text();
                let subCategory = $(element).children("div.title-time-container").children("div.title-container").children("div.category").children("a").text();
                let title = $(element).children("div.title-time-container").children("div.title-container").children("div.titletext").children("a").text();
                let imagePath = $(element).children("div.thumb-article-image-container").children("div.thumb-article-image").children("a").children("img").attr("src");
                let linkPath = $(element).children("div.title-time-container").children("div.title-container").children("div.titletext").children("a").attr("href");
                let linkUrl = webAddress + linkPath;
                let imageUrl = webAddress + imagePath;

                let articleData = {
                    domain: hostName,
                    category: subCategory.slice(1),
                    date: date.slice(1),
                    title: title.slice(1),
                    imageUrl: imageUrl,
                    link: linkUrl
                };
                
                if (hostName && subCategory && date && title && imageUrl && linkUrl) {

                    data.push(articleData);
                }
            });
            
            return data;

        })
        .catch(err => console.log(err));
    return result;


}