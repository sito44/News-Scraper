const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function() {
    const hostName = 'https://www.naturalnews.com/';
    const result = await rp(hostName)
    .then(html => {
        let data = [];
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


            if (date && title && author && imageUrl && description && link) {

                data.push(articleData);
            }
        });
        return data;

    })
    .catch(err => console.log(err)); 
    return result;

    
}