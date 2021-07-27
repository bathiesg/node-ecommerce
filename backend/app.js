const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
require('dotenv/config');
const api = process.env.API_URL;
const app = express();

const cors = require('cors');


//Enable cors to accepte all http reequests
app.use(cors());
app.options('*', cors())


//middleware here
app.use(express.json());
app.use(morgan('dev'))

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.BBDD_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('BBDD connection DONE');
})
.catch(() => {
    console.log(err);
});


app.listen('3000', () => {
    console.log('------------------------------------');
    console.log("app running on http://localhost:3000");
    console.log('------------------------------------');
})