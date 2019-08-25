const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async function () {
    const hostName = 'snlsnetwork';
    const webAddress = `https://www.${hostName}.com/news/`;
    const result = await rp(webAddress)
        .then(html => {
            let data = [];
            const $ = cheerio.load(html);
            $("div.wpb_wrapper").each(function (i, element) {



                let title1 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").children("h6").children("a").text();
                let link1 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").children("h6").children("a").attr("href");
                let date1 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").children("span").text();

                let title2 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().children("h6").children("a").text();
                let link2 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().children("h6").children("a").attr("href");
                let date2 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().children("span").text();

                let title3 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().children("h6").children("a").text();
                let link3 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().children("h6").children("a").attr("href");
                let date3 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().children("span").text();

                let title4 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().children("h6").children("a").text();
                let link4 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().children("h6").children("a").attr("href");
                let date4 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().children("span").text();

                let title5 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().next().children("h6").children("a").text();
                let link5 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().next().children("h6").children("a").attr("href");
                let date5 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().next().children("span").text();

                let title6 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().next().next().children("h6").children("a").text();
                let link6 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().next().next().children("h6").children("a").attr("href");
                let date6 = $(element).children("div.qt-part-archive-item.qt-item-inline.qt-clearfix").next().next().next().next().next().children("span").text();
                

                let linkData = {
                    domain: hostName,
                    date1: date1.slice(0,24).trim(),
                    title1: title1,
                    link1: link1,
                    date2: date2.slice(0, 24).trim(),
                    title2: title2,
                    link2: link2,
                    date3: date3.slice(0, 24).trim(),
                    title3: title3,
                    link3: link3,
                    date4: date4.slice(0, 24).trim(),
                    title4: title4,
                    link4: link4,
                    date5: date5.slice(0, 24).trim(),
                    title5: title5,
                    link5: link5,
                    date6: date6.slice(0, 24).trim(),
                    title6: title6,
                    link6: link6
                };


                

                    data.push(linkData);
                
            });
            console.log(data);
            return data;

        })
        .catch(err => console.log(err));
    return result;


}