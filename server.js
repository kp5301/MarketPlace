const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// const dressRoutes = require('./routes/dresses');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//app.use('/api/dresses', dressRoutes);
require('../dress-store/routes/productRoutes.js')(app)


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});
