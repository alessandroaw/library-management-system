const express = require('express')
const Book = require('../models/book')
const goodreads = require('../utils/goodreads-search');
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

  const keyword = new RegExp(req.query.q,'i');
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
// 9781449331818
// 987654321098
router.get('/book/api/:isbn', async (req, res, next) => {
  
  try {
    const book = await Book.findByIsbn(req.params.isbn)
    if(!book) {
      throw new Error('buku tidak ditemukan')
    }
    res.status(200).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/book/api/opname', async (req, res) => {
  var updates = [];
  var ids = req.body.checkedBooks;
  
  if(Array.isArray(ids) && ids.length){
    var temp = req.body.stock;
    for (let i = 0; i < temp.length; i++) {
      updates.push({
        stock: temp[i],
        goodCondition:req.body.goodCondition[i],
        badCondition:req.body.badCondition[i]
      })
      
    }
  } else{
    ids = [ids];
    updates.push({
      stock:req.body.stock,
      goodCondition:req.body.goodCondition,
      badCondition:req.body.badCondition
    })
  }
  console.log(ids);

  for (let i = 0; i < ids.length; i++) {
    var result = await Book.update({
        _id:ids[i]
      },{
        $set:{
          stock:updates[i].stock,
          goodCondition:updates[i].goodCondition,
          badCondition:updates[i].badCondition,
        }
      })
    console.log(result);
        
  }

  res.redirect('/admin/stock-opname/report')
  // res.status(200).send({ids,updates});
})

// ==========================================
// APPLICATION
// ==========================================
router.get('/book/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
    res.render('detail-buku.ejs', {book});
  } catch (e) {
    e.status = 400;
    next();
  }
});

module.exports = router;
