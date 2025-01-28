const express = require('express');
const words = require("../example/words.json");
const categories = require("../example/categories.json");
const router = express.Router();

// Define a route
router.get('/all', (req, res) => {
    try {
        res.json(words);
    } catch (err) {
        console.error('Veri alma hatası:', err);
        res.status(500).json({ error: 'Veri alınamadı.' });
    }
    // res.send("Ohohohoh müdürüm");// this gets executed when user visit http://localhost:3000/user
});

router.get('/categories', (req, res) => {
    try {
        res.json(categories);
    } catch (err) {
        console.error('Veri alma hatası:', err);
        res.status(500).json({ error: 'Veri alınamadı.' });
    }
    // res.send("Ohohohoh müdürüm");// this gets executed when user visit http://localhost:3000/user
});

module.exports = router;
