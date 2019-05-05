const express = require('express');
const Book = require('../models/book');
const router = new express.Router();

router.get('/admin/stock-opname/report', async (req, res) => {
  const data = await Book.find();
  res.render('admin-stock-opname-report.ejs', {data});
})


module.exports = router;
