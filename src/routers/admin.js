const express = require('express');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const Recommendation = require('../models/recommendation');
const router = new express.Router();

var properDate = (val) => {
  var date = new Date(val)
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  var today = dd + '/' + mm + '/' + yyyy;
  return today;
}

router.get('/admin/stock-opname/report', async (req, res) => {
  const data = await Book.find();
  res.render('admin-stock-opname-report.ejs', {data});
})

router.get('/admin/sirkulasi', async(req, res) => {
  const results = await Borrow.find({})
    .populate('_idMahasiswa')
    .populate('_idBuku');
  const data = results.map((result) => {
    console.log(result);
    const date = properDate(result.date);
    const dueDate = properDate(result.dueDate);
    const returnDate = result.isReturned? properDate(result.returnDate): 'belum dikembalikan';
    const returned = result.isReturned? 'sudah' : 'belum';
    return {
      title:result._idBuku.title,
      borrower:result._idMahasiswa.nama,
      date,
      dueDate,
      returnDate,
      returned
    }
  })
  // console.log(data);
  // res.status(200).send(data)
  res.render('admin-sirkulasi.ejs', {data})
})

router.get('/admin/recommendation', async (req, res) => {
  const data = await Recommendation.find({}, null, {sort:{count:-1}})
  res.render('admin-rekomendasi.ejs',{data});
})

module.exports = router;
