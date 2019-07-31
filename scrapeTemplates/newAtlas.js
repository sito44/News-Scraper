const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function () {
    const hostName = 'newatlas';
    const result = await rp(`https://www.${hostName}.com/`)
        .then(html => {
            let data = [];
            const $ = cheerio.load(html);
            $("article.content-snippet").each(function (i, element) {
                
                let title = $(element).children("a").children("div.content-snippet__title").children("h2").text();
                let subCategory = $(element).children("a").children("div.content-snippet__title").children("div.content-snippet__labels").children("span").text();
                let imagePath = $(element).children("a").children("div.content-snippet__image").children("img").attr("src");
                let link = $(element).children("a").attr("href");

                let articleData = {
                    domain: hostName,
                    title: title,
                    category: subCategory,
                    imageUrl: imagePath,
                    link: link
                };


                if (title && imagePath && link && subCategory) {

                    data.push(articleData);
                }
            });
            return data;

        })
        .catch(err => console.log(err));
    return result;


}