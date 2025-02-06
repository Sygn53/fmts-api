import randomUseragent from "random-useragent";

const headers1 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.google.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers2 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.bing.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers3 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.bing.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers4 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.yahoo.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers5 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.apple.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers6 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.google.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers7 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.google.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers8 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.google.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers9 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.apple.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers10 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.bing.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers11 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.mozilla.org/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headers12 = {
    "User-Agent": randomUseragent.getRandom(function (ua) {
        return !ua.folder.includes('/Mobile Devices') || !ua.folder.includes('/Miscellaneous');
    }),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.apple.com/",
    "DNT": "1",
    "Connection": "keep-alive"
};

const headersList = [headers1, headers2, headers3, headers4, headers5, headers6, headers7, headers8, headers9, headers10, headers11, headers12];

export const getRandomHeaders = () => {
    return headersList[Math.floor(Math.random() * headersList.length)];
};
