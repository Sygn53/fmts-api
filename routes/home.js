const express = require('express');
const router = express.Router();

// Define a route
router.get('/', (req, res) => {
    res.send("success");// this gets executed when user visit http://localhost:3000/user
});

module.exports = router;
