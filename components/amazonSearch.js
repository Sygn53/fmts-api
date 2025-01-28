const axios = require('axios');
const cheerio = require('cheerio');

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
};

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


                // Best Seller and amazon Choice
                const bestSellerBadge = $(element).find('span .a-badge-text').text().trim();
                const isBestSeller = bestSellerBadge === 'Best Seller';
                const amazonChoice = bestSellerBadge === 'Overall Pick';

                // Ürün rating
                const rating = $(element).find("span .a-icon-alt").first().text().trim();

                if (title && image) {
                    products.push({
                        title,
                        price,
                        image,
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
