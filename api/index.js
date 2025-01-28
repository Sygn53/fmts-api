const express = require('express');
const app = express();

const usersRoute = require('../routes/users');
const homeRoute = require('../routes/home');
const amazonData = require('../routes/amazonData');
const wordsData = require('../routes/wordsData');

// URL Encoded veri ayrıştırıcı (Opsiyonel)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/monitoring', monitorRoute);
app.use('/' ,homeRoute);
app.use('/users', usersRoute);
app.use('/amazonData', amazonData);
app.use('/words', wordsData);

// const ipAddress = "10.34.10.138"; // IP adresiniz
const ipAddress = "10.34.10.138"; // IP adresiniz
const port = process.env.PORT || 3031;

app.listen(port, ipAddress,() => {
    console.log(`Server is running at http://${ipAddress}:${port}`);
});

// module.exports = app;
