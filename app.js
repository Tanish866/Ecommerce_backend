const express = require('express');
const cors = require('cors');
const path = require('path');
const cookies = require('cookie-parser');

const app = express();
app.use(cookies());

const productRoute = require('./routes/product');
const homeRoute = require('./routes/home');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

const corsOptions = {
    origin: [
        'https://shop-cart-kohl.vercel.app',
        'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.disable('view cache');

app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/carts', cartRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

app.get('/accesstoken', (req, res) => {
    console.log('cookie', req.cookies);
    return res.json({ token: req.cookies['jwt-token'] });
});

app.get('/logout', (req, res) => {
    res.clearCookie('jwt-token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    return res.status(200).json({ msg: 'logout done' });
});

module.exports = app;