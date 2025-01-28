const axios = require('axios');
const cheerio = require('cheerio');
const { HttpsProxyAgent } = require('https-proxy-agent'); // Proxy agent doğru şekilde import edildi
const fs = require('fs');
const {fetchProxies} = require("../api/fetchProxies");


const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
};

const bestSellerUrl = 'https://www.amazon.com/Best-Sellers/zgbs';

// Proxy listesini yükle
const proxyList = fs.readFileSync('./api/proxy.txt', 'utf-8').split('\n').map(p => p.trim());

// Proxy seçme fonksiyonu
const getRandomProxy = () => {
    const randomIndex = Math.floor(Math.random() * proxyList.length);
    return proxyList[randomIndex];
};

const bestSeller = async () => {
    try {
        let success = false;
        let data = null;
        const myProxy = await fetchProxies();
        while (!success) {
            // const proxy = getRandomProxy();
            const proxy = '54.224.215.61:8888';
            console.log(`Denenen Proxy: ${myProxy}`);

            const agent = new HttpsProxyAgent(`http://${myProxy}`); // Proxy ayarlarını yapılandır


            try {
                const response = await axios.get(bestSellerUrl, {
                    headers: headers,
                    agent: agent, // Proxy agent ekleniyor
                    timeout: 5000, // Timeout süresi
                });

                data = response.data; // Veri çekildi
                success = true; // Başarılı olduğunda döngüyü bitir
            } catch (err) {
                console.error(`Proxy Hatası (${proxy}): ${err.message}`);
            }
        }

        // const { data } = await axios.get(bestSellerUrl,{ headers });

        // Sayfanın içeriğini Cheerio ile yükle
        const $ = cheerio.load(data);

        // Best Seller ürünlerini seç
        const products = [];
        $('.a-carousel-viewport').each((index, element) => {
            const title = [];
            const link = [];
            // Title
            $(element).find('.p13n-sc-truncate-desktop-type2').each((_, item) => {
                title.push($(item).text().trim());
            });
            // Link
            if (index < 4) {
                $(element).find('.a-link-normal').first().each((_, item) => {
                    link.push($(item).attr('href'));
                });
            }

            products.push({
                carouselIndex: index + 1,
                title: title,
                link: link,
            });
        });

        return products;

    } catch (error) {
        console.error("Genel Hata:", error.message);
    }
}

module.exports = { bestSeller };
