const express = require('express');
const router = express.Router();
const { amazonSearch } = require('../components/amazonSearch');
const {amazonASIN} = require("../components/amazonASIN");
const {bestSeller} = require("../components/bestSeller");

router.get('/asin/:id', async (req, res) => {
    const ASIN = req.params.id;

    try {
        const results = await amazonASIN(ASIN);
        res.json(results);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while fetching data from Amazon.'});
    }
});

router.get('/search/:query', async (req, res) => {
    const query = req.params.query || 'clock';

    try {
        const results = await amazonSearch(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data from Amazon.' });
    }
});

router.get('/bestSeller', async (req, res) => {

    try {
        const results = await bestSeller();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data from Amazon.' });
    }
});

module.exports = router;

