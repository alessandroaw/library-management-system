const express = require('express');
const path = require('path');
const ejs = require('ejs');
require('./db/mongoose');

const app = express();
const port  = process.env.port || 3020;

// Setup path
const publicPathDirectory = path.join(__dirname, '../../application/public');
const viewsPath = path.join(__dirname, '../../application/templates/views')
const partialsPath = path.join(__dirname, '../../application/templates/partials')

// router
const bookRouter = require('./routers/book');
const mahasiswaRouter = require('./routers/mahasiswa')

// setup public directory
app.use(express.json());

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(express.static(publicPathDirectory));

app.get('/', (req,res) => {
  res.render('home.ejs', {
    title:'Home'
  });
});

app.use(bookRouter);
app.use(mahasiswaRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}` );
})
