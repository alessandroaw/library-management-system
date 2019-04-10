const express = require('express')
const {Book} = require('../models/book')
const router = new express.Router();

router.get('/books', async (req, res) => {

    if(req.query.keyword){
        var keyword = new RegExp(req.query.keyword,"i");

        Book.find({title:keyword}, null, {sort:{title:1}}).then((books) => {
            res.send(books);
        }).catch((e) => {
            res.status(400).send(e)
        })

    } else {
        Book.find({}, null, {sort:{title:1}}).then((books) => {
            res.send(books);
        }).catch((e) => {
            res.status(400).send(e)
        })
    }

});

router.post('/book', async (req, res) => {
  const book = new Book(req.body);

  book.save().then(() => {
    res.send(book);
  }).catch((e) => {
    res.status(400).send(e);
  })

});

router.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        res.render('book.ejs', {title:book.title, book});
    })
});

module.exports = router;
