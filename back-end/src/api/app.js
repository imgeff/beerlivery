const express = require('express');
const cors = require('cors');

const loginRoutes = require('../routes/loginRoutes');
const saleRoutes = require('../routes/salesRoutes');
const ordersRoutes = require('../routes/ordersRoutes');
const registerRoutes = require('../routes/registerRoutes');
const productsRoutes = require('../routes/productsRoutes');
const salesRoutes = require('../routes/salesRoutes');
const usersRoutes = require('../routes/usersRoutes');
const brandingsRoutes = require('../routes/brandingsRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('images'));

app.use('/', loginRoutes);
app.use('/', registerRoutes);
app.use('/', productsRoutes);
app.use('/', salesRoutes);
app.use('/', saleRoutes);
app.use('/', ordersRoutes);
app.use('/', usersRoutes);
app.use('/', brandingsRoutes);

module.exports = app;
