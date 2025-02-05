const axios = require('axios');
const {getRandomHeaders} = require("../api/Headers");
const { JSDOM } = require('jsdom');

const headers = getRandomHeaders();

const amazonSearch = async (searchQuery, maxPages) => {
    const baseUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`;
    let currentPage = 1;
    let products = [];

    while (currentPage <= maxPages) {
        const url = `${baseUrl}&page=${currentPage}`;
        console.log(`Fetching page: ${currentPage} - ${url}`);

        try {
            const { data } = await axios.get(url, { headers });
            const dom = new JSDOM(data);
            const document = dom.window.document;

            // Ürünleri seç
            const productElements = document.querySelectorAll('.s-main-slot .s-result-item');
            productElements.forEach((element) => {
                // Ürün başlığı
                const titleElement = element.querySelector('span .a-text-normal');
                const title = titleElement ? titleElement.textContent.trim() : '';

                // Ürün fiyatı
                const priceElement = element.querySelector('.a-price .a-offscreen');
                let price = priceElement ? priceElement.textContent.trim() : '';
                if (price.includes('$')) {
                    price = price.split('$').filter(Boolean)[0];
                    price = `$${price}`;
                }

                // Ürün resmi
                const imageElement = element.querySelector('.s-image');
                const image = imageElement ? imageElement.getAttribute('src').trim() : '';

                // ASIN kodu
                const asin = element.getAttribute('data-asin')?.trim() || '';

                // Best Seller ve Amazon Choice
                const badgeElement = element.querySelector('span .a-badge-text');
                const bestSellerBadge = badgeElement ? badgeElement.textContent.trim() : '';
                const isBestSeller = bestSellerBadge === 'Best Seller';
                const amazonChoice = bestSellerBadge === 'Overall Pick';

                // Ürün rating
                const ratingElement = element.querySelector('span .a-icon-alt');
                const rating = ratingElement ? ratingElement.textContent.trim() : '';

                // Yorum sayısı (countReview)
                const reviewElement = element.querySelector('span.a-size-base.s-underline-text');
                let countReview = reviewElement ? reviewElement.textContent.trim() : '';
                countReview = countReview.replace(/[,]/g, ''); // Virgülleri temizle

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
