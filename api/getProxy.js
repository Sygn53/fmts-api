const fs = require('fs');
const path = require('path');




// Proxies.txt dosyasını oku
const getProxy = () => {
    const proxyFilePath = path.resolve(__dirname, 'proxy.txt');
    let proxyList = [];


    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomNumber = getRandomNumber(1, 3);
    console.log("Rastgele seçilen sayı:", randomNumber);

    try {
        const proxyData = fs.readFileSync(proxyFilePath, 'utf8');
        const randomProxy = proxyData.split('\n')[0]
        console.log("proxyData:", randomProxy);
        const [host, port] = randomProxy.trim().split(':');
        return { host, port };

    } catch (error) {
        console.error('Proxy dosyası okunamadı:', error.message);
        process.exit(1);
    }
}



module.exports = { getProxy };
