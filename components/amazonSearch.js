const axios = require('axios');
const cheerio = require('cheerio');
const {getRandomHeaders} = require("../api/Headers");

const headers = getRandomHeaders();

const amazonSearch = async (searchQuery, maxPages) => {
    const baseUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`;
    let currentPage = 1;
    let products = [];

    while (currentPage <= maxPages) {
        const url = `${baseUrl}&page=${currentPage}`;
        console.log(`Fetching page: ${currentPage} - ${url}`);

        try {
            const { data } = await axios.get(url,{ headers });
            const $ = cheerio.load(data);

            $('.s-main-slot .s-result-item').each((index, element) => {
                const title = $(element).find('span .a-text-normal').first().text().trim();

                let price = $(element).find('.a-price .a-offscreen').first().text().trim();
                if (price.includes('$')) {
                    price = price.split('$').filter(Boolean)[0];
                    price = `$${price}`;
                }

                //ürün image
                const image = $(element).find('.s-image').attr('src')?.trim();

                // ASIN kodunu al
                const asin = $(element).attr('data-asin')?.trim();

                // Best Seller and amazon Choice
                const bestSellerBadge = $(element).find('span .a-badge-text').text().trim();
                const isBestSeller = bestSellerBadge === 'Best Seller';
                const amazonChoice = bestSellerBadge === 'Overall Pick';

                // Ürün rating
                const rating = $(element).find("span .a-icon-alt").first().text().trim();

                // **Yorum Sayısını Al (countReview)**
                let countReview = $(element).find("span.a-size-base.s-underline-text").first().text().trim();


                // Sayıyı temizle (örneğin "12,345" -> 12345)
                countReview = countReview.replace(/[,]/g, "");


                if (title && image) {
                    products.push({
                        title,
                        price,
                        image,
                        asin,
                        countReview: countReview,
                        amazonChoice: amazonChoice,
                        bestSeller: isBestSeller,
                        rating: rating,
                    });
                }
            });

            // Bir sonraki sayfaya geç
            currentPage++;
        } catch (error) {
            console.error(`Error fetching page ${currentPage}:`, error);
            break;
        }
    }

    return products;
};

module.exports = { amazonSearch };
