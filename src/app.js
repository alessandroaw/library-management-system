const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require("body-parser");
require('./db/mongoose');

const app = express();

// Setup path
const publicPathDirectory = path.join(__dirname, '../../application/public');
const viewsPath = path.join(__dirname, '../../application/templates/views')
const partialsPath = path.join(__dirname, '../../application/templates/partials')

// router
const bookRouter = require('./routers/book');
const mahasiswaRouter = require('./routers/mahasiswa')
const recommendationRouter = require('./routers/recommendation')
const adminRouter = require('./routers/admin')
const borrowRouter = require('./routers/borrow')

// setup response parser 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(express.static(publicPathDirectory));

app.get('/', (req,res) => {
  res.render('index-cari.ejs', {
    title:'Home'
  });
});

app.use(bookRouter);
app.use(mahasiswaRouter);
app.use(recommendationRouter);
app.use(adminRouter);
app.use(borrowRouter);

module.exports = app;