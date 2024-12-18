const express = require('express');
const router = express.Router();
const data = require('../example/data.json');

// Define a route
router.get('/ayar', (req, res) => {
    try {
        res.json(data);
    } catch (err) {
        console.error('Veri alma hatası:', err);
        res.status(500).json({ error: 'Veri alınamadı.' });
    }
});

router.get('/101', (req, res) => {
    res.send('this is user 101 route');// this gets executed when user visit http://localhost:3000/user/101
});

router.get('/102', (req, res) => {
    res.send('this is user 102 route');// this gets executed when user visit http://localhost:3000/user/102
});

module.exports = router;
