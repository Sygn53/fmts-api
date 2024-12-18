const express = require('express');
const app = express();

const usersRoute = require('../routes/users');

// URL Encoded veri ayrıştırıcı (Opsiyonel)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/monitoring', monitorRoute);
app.use('/users', usersRoute);

//const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


module.exports = app;
