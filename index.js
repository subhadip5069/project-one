const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const cookieparser = require('cookie-parser');
const connectDB = require('./db/dataBase');
require('dotenv').config();



const app = express();

connectDB();

app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// views

app.set('view engine', 'ejs');
app.set('views', 'views');

// public folder
app.use(express.static('public'));
app.use(express.static('uploads'));

// routes
// api

app.use('/api/admin', require('./routes/api/Admin.login.routes'));
app.use('/api/form', require('./routes/api/Form.routes'));

// ui
// Admin UI

app.use('/admin', require('./routes/Admin/Admin.Ui.routes'));
app.use('/form', require('./routes/Admin/Admin.Form.routes'));
app.use('/auth', require('./routes/Admin/Admin.auth.routes'));


// user UI
app.use ('/user', require('./routes/user/user.route'));



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`);
    console.log(process.env.MONGO_URI);
});