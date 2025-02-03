const axios = require("axios");
const cheerio = require("cheerio");
const {getRandomHeaders} = require("../api/Headers");

const headers = getRandomHeaders();

// Amazon ürün sayfası URL'si (Örnek bir ürün URL'si)
const urlASIN = "https://www.amazon.com/dp/";

const amazonASIN = async (ASIN) => {
    let data = {};
    await axios
        .get(urlASIN + ASIN, { headers })
        .then((response) => {
            // HTML içeriğini cheerio ile ayrıştırıyoruz
            const $ = cheerio.load(response.data);

            // Ürün adı
            const title = $("#productTitle").text().trim();

            // Ürün görseli
            const imageElement = $("#imgTagWrapperId img");
            const imageUrl = imageElement.attr("src");

            // Ürün rating
            const rating = $("span .a-size-base .a-color-base").text().trim();

            // BestSeller kontrolü
            let bestsellerDesc = null;
            let active = false;
            const bestsellerElement = $(".badge-link");
            if (bestsellerElement.length > 0) {
                bestsellerDesc = bestsellerElement.text().trim();
                active = true;
            }
            const bestSellerRank = $("#productDetails_detailBullets_sections1")
                    .find("th:contains('Best Sellers Rank')")
                    .next("td")
                    .text()
                    .trim()
                || $("li:contains('Best Sellers Rank')")
                    .text()
                    .trim();
            const bestSeller = {
                active: active,
                description: bestsellerDesc,
                bestSellerRank: bestSellerRank,
            }

            // Amazon's Choice kontrolü
            const isAmazonChoice = $("span.ac-badge-text-primary:contains('Amazon')")
                .next("span.ac-badge-text-secondary:contains('Choice')")
                .length > 0;
            // const isAmazonChoice = $("span.ac-badge-rectangle").length > 0; //TODO: ikiside calisiyor

            // Ürün fiyatı
            const priceContainer = $(".a-price"); // Fiyat kapsayıcısını seçiyoruz
            const priceWhole = priceContainer.find(".a-price-whole").first().text().trim();
            const priceFraction = priceContainer.find(".a-price-fraction").first().text().trim();

            // Mevcut renkler
            const colorOptions = [];
            const colorContainer = $("#variation_color_name"); // Renk seçeneklerinin bulunduğu alan
            colorContainer.find(".a-button-inner img").each((index, element) => {
                const colorName = $(element).attr("alt")?.trim(); // Renk adı
                const colorImage = $(element).attr("src"); // Renk görsel URL'si

                if (colorName) {
                    colorOptions.push({
                        name: colorName,
                        image: colorImage || "Görsel bulunamadı"
                    });
                }
            });

            // ürün aciklamalari
            const productDescriptions = [];
            $("#feature-bullets ul li").each((index, element) => {
                const description = $(element).text().trim();
                if (description) {
                    productDescriptions.push(description);
                }
            });

            // Verileri birleştirip yazdırıyoruz
            const fullPrice = priceWhole && priceFraction ? `${priceWhole}${priceFraction}` : priceWhole;
            let temp = {
                title: title,
                price: fullPrice,
                imageUrl: imageUrl,
                ASIN: ASIN,
                rating: rating,
                bestSeller: bestSeller,
                amazonChoice: isAmazonChoice,
                colors: colorOptions.length > 0 ? colorOptions : "Renk seçenekleri bulunamadı",
                description: productDescriptions,
            }
            data = temp

        })

        .catch((error) => {
            console.error("Bir hata oluştu:", error.message);
        });

    return data;
}

module.exports = { amazonASIN };
