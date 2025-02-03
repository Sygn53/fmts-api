const axios = require('axios');
const cheerio = require('cheerio');
const {getRandomHeaders} = require("../api/Headers");
// const puppeteer = require('puppeteer');

const headers = getRandomHeaders();

const bestSellerUrl = 'https://www.amazon.com/Best-Sellers/zgbs';


// const proxyConfig = {
//     protocol: 'http',
//     host: "open.proxymesh.com", // ProxyMesh'ten aldığın proxy adresi
//     port: 31280, // Proxy portu
//     auth: {
//         username: "Köfte", // ProxyMesh kullanıcı adın
//         password: "proxy_oktay53"  // ProxyMesh şifren
//     }
// };


const bestSeller = async () => {
    try {
        const { data } = await axios.get(bestSellerUrl, {
            headers: headers,
            // proxy: proxyConfig
        });

        // Sayfanın içeriğini Cheerio ile yükle
        const $ = cheerio.load(data);

        // Best Seller ürünlerini seç
        const products = [];

        $('.a-carousel-viewport').each((index, element) => {
            const title = [];
            const link = [];
            const image = [];
            const items = [];

            // Title
            $(element).find('.p13n-sc-truncate-desktop-type2').each((ind, item) => {
                title.push($(item).text().trim());
            });

            // Link
            $(element).find('.a-link-normal').each((ind, item) => {
                if (ind < 5) {
                    link.push($(item).attr('href'));
                }
            });

            // Image
            $(element).find('img').each((ind, img) => {
                const imgSrc = $(img).attr('src');
                if (imgSrc) {
                    image.push(imgSrc);
                }
            });

            for (let i = 0; i < title.length; i++) {
                let obj = {
                    title: title[i],
                    link: link[i],
                    image: image[i],
                }
                items.push(obj);
            }
            const categoryTitle = $('h2.a-carousel-heading').text().trim();
            const categories = categoryTitle.split('&')[index]


            products.push({
                categories: categories,
                index: index,
                items: items,
            });
        });

        return products;

    } catch (error) {
        console.error("Genel Hata:", error.message);
    }
}

// const bestSeller = async () => {
//     const browser = await puppeteer.launch({
//         headless: "new", // veya false kullan
//         args: ["--disable-blink-features=AutomationControlled"]
//     });
//     const page = await browser.newPage();
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
//
//     try {
//         await page.goto(bestSellerUrl, { waitUntil: 'networkidle2' });
//
//         const products = await page.evaluate(() => {
//             const items = [];
//             document.querySelectorAll('.a-carousel-viewport').forEach((element, index) => {
//                 const titleElements = element.querySelectorAll('.p13n-sc-truncate-desktop-type2');
//                 const title = Array.from(titleElements).map(el => el.innerText.trim());
//
//                 let link = '';
//                 if (index < 4) {
//                     const linkElement = element.querySelector('.a-link-normal');
//                     if (linkElement) {
//                         link = linkElement.href;
//                     }
//                 }
//
//                 items.push({
//                     carouselIndex: index + 1,
//                     title,
//                     link,
//                 });
//             });
//             return items;
//         });
//
//         await browser.close();
//         return products;
//     } catch (error) {
//         console.error("Genel Hata:", error.message);
//         await browser.close();
//     }
// };

module.exports = { bestSeller };
