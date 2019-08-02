const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function () {
    
    const hostName = 'consciouslifestylemag';
    const result = await rp(`https://www.${hostName}.com/`)
        .then(html => {
            let data = [];
            const $ = cheerio.load(html);
            $("li.blog-item").each(function (i, element) {

                let date = $(element).children("div.blog-details-wrap").children("div.blog-item-details").text();
                let title = $(element).children("div.blog-details-wrap").children("h3").text();
                let subCategory = $(element).children("div.blog-details-wrap").children("div.item-cats").first().text();
                let imagePath = $(element).children("figure").children("a").children("img").attr("src");
                let description = $(element).children("div.blog-details-wrap").children("div.excerpt").text();
                let link = $(element).children("div.blog-details-wrap").children("div.read-more-bar").children("a").attr("href");
                

                let articleData = {
                    domain: hostName,
                    category: subCategory,
                    title: title,
                    date:  date,
                    imageUrl: imagePath,
                    description: description,
                    link: link
                };
                // console.log(articleData);
                

                if (hostName && date && title && imagePath && description && link && subCategory) {

                    data.push(articleData);
                }
            });
            return data;

        })
        .catch(err => console.log(err));
    return result;


}