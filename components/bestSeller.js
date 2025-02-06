const axios = require('axios');
const { JSDOM } = require('jsdom');
const { getRandomHeaders } = require("../api/Headers");

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
    let again = true;
    while (again) {
        try {
            const { data } = await axios.get(bestSellerUrl, {
                headers: headers,
                // proxy: proxyConfig
            });

            // Sayfanın içeriğini JSDOM ile yükle
            const dom = new JSDOM(data);
            const document = dom.window.document;

            // Best Seller ürünlerini seç
            const products = [];

            const categories = [];
            const categoryTitle = document.querySelectorAll('h2.a-carousel-heading');
            categoryTitle.forEach((item, index) => {
                categories.push(item.textContent.trim());
            });

            const carouselElements = document.querySelectorAll('.a-carousel-viewport');
            carouselElements.forEach((element, index) => {
                const title = [];
                const link = [];
                const image = [];
                const rating = [];
                const price = [];
                const items = [];

                // Title
                const titleElements = element.querySelectorAll('.p13n-sc-truncate-desktop-type2');
                titleElements.forEach((item) => {
                    title.push(item.textContent.trim());
                });

                // Link
                const linkElements = element.querySelectorAll('.a-link-normal');
                linkElements.forEach((item, ind) => {
                    if (ind < 6) {
                        link.push(item.getAttribute('href'));
                    }
                });

                // Image
                const imgElements = element.querySelectorAll('img');
                imgElements.forEach((img) => {
                    const imgSrc = img.getAttribute('src');
                    if (imgSrc) {
                        image.push(imgSrc);
                    }
                });

                // Rating
                const ratingElements = element.querySelectorAll('.a-icon-alt');
                ratingElements.forEach((item) => {
                    rating.push(item.textContent.trim());
                });

                // Price
                const priceElements = element.querySelectorAll('[class*="p13n-sc-price"]');
                priceElements.forEach((item, index) => {
                    // Eğer öğe bir <style> etiketi içinde değilse işle
                    if (!item.closest('style') && !price.includes(item.textContent.trim())) {
                        price.push(item.textContent.trim());
                    }
                });

                for (let i = 0; i < 6; i++) {
                    let obj = {
                        title: title[i] || '',
                        link: link[i] || '',
                        image: image[i] || '',
                        rating: rating[i] || 'No rating',
                        price: price[i] || 'No price',
                    };
                    items.push(obj);
                }

                products.push({
                    categories: categories[index],
                    index: index,
                    items: items,
                });
            });
            if (products[0]?.items[0].title === '' || products[0]?.items[0].price === 'No price') {
                again = true;
            } else {
                again = false;
                return products;
            }
        } catch (error) {
            console.error("Genel Hata:", error.message);
            again = true;
            // return "Genel Hata:" + error.message
        }
    }


};

module.exports = { bestSeller };
