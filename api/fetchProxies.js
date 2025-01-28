const cheerio = require('cheerio');
const axios = require('axios');


async function fetchProxies() {
    const proxy = {
        host: 'proxy.toolip.io',
        port: '31114',
        auth: {username: '8c5906b99fbd1c0bcd0f916d545c565ad9da188aa10f83cb13222c60f0dc4474703981045fa13438b264979427698487ebd15ff086d27f96a4b2f0ced773ff2a', password: 'v0hxv9os6p8q'},
    };
    let temp = "";
    let success = false;
    while (!success) {
        try {
            const response = await axios.get("http://httpbin.org/ip", {
                proxy,
                timeout: 5000
            });
            if (response.status === 200) {
                console.log("proxy: ", response.data.origin);
                temp = response.data.origin;
                success = true;
                // console.log(`Proxy %O is working. Your IP: ${response.data.origin}`, proxy);
            } else {
                console.log(`Proxy %O returned status code ${response.status}`, proxy);
            }
        } catch (error) {
            console.log(`Error occurred while testing proxy %O: ${error.message}`, proxy);
        }
    }
    return temp;
}

// const fetchProxies = async () => {
//     function getRandomNumber(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     }
//
//
//     // try {
//     //     const response = await axios.get('https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt');
//     //     const proxyList = response.data.split('\n').filter(line => line.trim() !== '');
//     //
//     //     const randomNumber = getRandomNumber(1, proxyList.length);
//     //
//     //     const [host, port] = proxyList[randomNumber].trim().split(':');
//     //     //console.log(`Proxy: `, host, port);
//     //     return { host:'27.79.207.98', port:'16000' };
//     //
//     // } catch (error) {
//     //     console.error('Proxy listesi çekilemedi:', error.message);
//     //     return [];
//     // }
//     //console.log(proxies);
//     const host = '27.79.207.98'
//     const port = '16000'
//     return { host, port };
// }

module.exports = { fetchProxies };
