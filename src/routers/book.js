const express = require('express')
const Book = require('../models/book')
const router = new express.Router();

// ==========================================
// API
// ==========================================

//book/api/?keyword=1
//book/api/?step=2
// GET books by keyword
router.get('/book/api/search', async (req, res) => {
  // const step;

  // // if(req.query.step){
  // //   step = parseInt(req.query.step);
  // // }

  // // // var limit = 3;
  // // // var skip = 3*(step-1)

  const keyword = new RegExp(req.query.keyword,'i');

  try {
    const book = await Book.find({
        $or:[{title:keyword},{subtitle:keyword},{author:keyword}]
      },
      null,{
        sort:{title:1},
        // limit:limit,
        // skip:skip
      })

    res.send(book);
  } catch (e) {
    res.status(400).send(e)
  }

});

// POST book to database
router.post('/book/api', (req, res) => {
  const book = new Book(req.body);

  book.save().then(() => {
    res.status(201).send(book);
  }).catch((e) => {
    res.status(400).send(e);
    console.log(e);

  })

});


// ==========================================
// APPLICATION
// ==========================================
router.get('/book/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
    res.render('book.ejs', {title:book.title, book});
  } catch (e) {
    e.status = 400;
    next();
  }
});

module.exports = router;
