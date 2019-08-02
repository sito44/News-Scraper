const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function() {
    const hostName = 'naturalnews';
    const webAddress = `https://www.${hostName}.com/`;
    const result = await rp(webAddress)
    .then(html => {
        let data = [];
        const $ = cheerio.load(html);
        $("div.IFB").each(function (i, element) {
            
            let date = $(element).children("div.IFA").children("time.entry-time").text();
            let title = $(element).children("div.IFH").children("a").text();
            let author = $(element).children("div.IFA").children("span.entry-author").children("a").children().text();
            let imagePath = $(element).children("div.IFP").children("a").children().attr("src");
            let description = $(element).children("div.IFD").find("p").text();
            let link = $(element).children("div.IFH").children("a").attr("href");
            let imageUrl = webAddress + imagePath;

            let articleData = {
                domain: hostName,
                date: date,
                title: title,
                author: author,
                imageUrl: imageUrl,
                description: description,
                link: link
            };


            if (date && title && author && imageUrl && description && link) {

                data.push(articleData);
            }
        });
        return data;

    })
    .catch(err => console.log(err)); 
    return result;

    
}