const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function () {
    const hostName = 'newatlas';
    const result = await rp(`https://www.${hostName}.com/`)
        .then(html => {
            const $ = cheerio.load(html);
            
            let data = [
                {
                    domain: hostName,
                    title: $("div .PromoC-content").children("h2").children("a").text(),
                    category: $("div .PromoC-category").children("a").text(),
                    imageUrl: $("div .PromoC-media").children("a").children("img").attr("data-src"),
                    description: $("div .PromoC-description").text(),
                    link: $("div .PromoC-content").children("h2").children("a").attr("href")
                },
                {
                    domain: hostName,
                    title: $("div .ListG-items-column").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("h2").children("a").text(),
                    category: $("div .ListG-items-column").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-category").children("a").text(),
                    imageUrl: $("div .ListG-items-column").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-media").children("a").children("img").attr("data-src"),
                    description: $("div .ListG-items-column").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-description").text(),
                    link: $("div .ListG-items-column").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("h2").children("a").attr("href")
                },
                {
                    domain: hostName,
                    title: $("div .ListG-items-column").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("h2").children("a").text(),
                    category: $("div .ListG-items-column").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-category").children("a").text(),
                    imageUrl: $("div .ListG-items-column").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-media").children("a").children("img").attr("data-src"),
                    description: $("div .ListG-items-column").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-description").text(),
                    link: $("div .ListG-items-column").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("h2").children("a").attr("href")
                }
                // {
                //     domain: hostName,
                //     title: $(".ListD-items").children().eq(0).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-title").children("a").text(),
                //     category: $(".ListD-items").children().eq(0).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-category").children("a").text(),
                //     imageUrl: $(".ListD-items").children().eq(0).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-media").children("a").children("img").attr("data-src"),
                //     description: $(".ListD-items").children().eq(0).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-description").text(),
                //     link: $(".ListD-items").children().eq(0).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListD-items").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-title").children("a").text(),
                //     category: $(".ListD-items").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-category").children("a").text(),
                //     imageUrl: $(".ListD-items").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-media").children("a").children("img").attr("data-src"),
                //     description: $(".ListD-items").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-description").text(),
                //     link: $(".ListD-items").children().eq(1).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListD-items").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-title").children("a").text(),
                //     category: $(".ListD-items").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-category").children("a").text(),
                //     imageUrl: $(".ListD-items").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-media").children("a").children("img").attr("data-src"),
                //     description: $(".ListD-items").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-description").text(),
                //     link: $(".ListD-items").children().eq(2).children("div .PromoB").children("div .PromoB-content").children("div .PromoB-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(0).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(0).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(0).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(0).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(1).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(1).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(1).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(1).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(2).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(2).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(2).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(2).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(3).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(3).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(3).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(3).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(4).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(4).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(4).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(4).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(5).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(5).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(5).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(5).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(6).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(6).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(6).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(6).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(7).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(7).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(7).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(7).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(8).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(8).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(8).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(8).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                // {
                //     domain: hostName,
                //     title: $(".ListJ-items").children().eq(9).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").text(),
                //     category: $(".ListJ-items").children().eq(9).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-category").children("a").text(),
                //     imageUrl: $(".ListJ-items").children().eq(9).children("div .PromoA").children("div .PromoA-media").children("a").children("img").attr("data-src"),
                //     link: $(".ListJ-items").children().eq(9).children("div .PromoA").children("div .PromoA-content").children("div .PromoA-title").children("a").attr("href")
                // },
                
            ];


            return data;

        })
        .catch(err => console.log(err));
    return result;


}