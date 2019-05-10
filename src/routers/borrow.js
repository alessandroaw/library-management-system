const express = require('express');
const Mahasiswa = require('../models/mahasiswa');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const router = new express.Router();
const {sendBorrowReceipt, sendReturnReceipt} = require('../utils/account');
const {authenticate} = require('../middleware/mahasiswa-auth');

var calculateFine = (result) => {
  const dateDiff = new Date(result.dueDate).getDate() - new Date().getDate();
  const fine = (dateDiff) > 0? dateDiff*1000 : 0;
  return fine;   
}

router.post('/borrow/api', async (req, res) => {
  const body = req.body;
  const mahasiswaId = req.session.mahasiswaId;
  const book = await Book.findOneAndUpdate(
    {
      isbn:body.bookIsbn
    },{
      $inc:{
        'stock':-1  
      }
    });
  
  const borrow = new Borrow({
    _idMahasiswa: mahasiswaId,
    _idBuku:book._id,
  })

  const response = await borrow.save();
  
  res.status(201).send(response);

})

router.post('/borrow/api/br', authenticate, async (req, res) => {
  // move variable
  console.log('masuk borrow post api')
  var check = req.body.checkedBooks;
  const mahasiswaId = req.session.mahasiswaId;
  console.log(check);

  try {
    // if array do multiple update and insert
    if(!(Array.isArray(check) && check.length)) {
      check = [check]
    }

    // update book stock
    var temp = await Book.update(
      {
        _id:{$in: check}
      },{
        $inc:{
          'stock':-1  
        }
      },{
        multi: true
      });
    
    var books = await Book.find(
      {
        _id:{$in: check}
      })

    sendBorrowReceipt(req.mahasiswa.nama, req.mahasiswa.email, books);

    // Insert Borrow Document
    const borrows = check.map( (check) => {
      return new Borrow({
        _idBuku:check,
        _idMahasiswa: mahasiswaId
      });
    })
    var result = await Borrow.insertMany(borrows);
    console.log(result);
    
    
  } catch (e) {
    console.log(e);
    
    res.status(400).send(e);
  }

  res.redirect('/mahasiswa/');
})


router.post('/borrow/api/rt', authenticate, async (req, res) => {
  console.log('masuk return post api')
  var check = req.body.checkedBooks;
  const mahasiswaId = req.session.mahasiswaId;
  console.log(check);

  try {
    if(!(Array.isArray(check))) {
      check = [check]
    }
    var temp = await Book.update(
      {
        _id:{$in: check}
      },{
        $inc:{
          'stock':1  
        }
      },{
        multi: true
      });
      console.log(temp);
      console.log('ye');
    
    // Find borrow with key ==> (mahasiswaID, check[i])
    
    const docs = await Borrow.find({
        $and:[
          {_idMahasiswa:mahasiswaId},
          {_idBuku:{$in:check}},
          {isReturned: false}
        ]
      }).populate('_idBuku')

      console.log(docs);
      var books = [];
      
      docs.forEach(async(doc) => {
        books.push(doc._idBuku);
        const fine = calculateFine(doc);
        const result = await Borrow.update({
          _id:doc._id
        },{
          $set:{
            isReturned: true,
            returnDate: new Date(),
            fine: fine
          }
        })
        console.log(result);
        
      });
      sendReturnReceipt(req.mahasiswa.nama, req.mahasiswa.email, books)

  } catch (e) {
    console.log(e);
    
    res.status(400).send(e);
  }

  res.redirect('/mahasiswa/')
})

// Pinjam buku dengan input nim & isbn
// router.post('/mahasiswa/borrow', (req, res) => {
//     Mahasiswa.findByNim(req.body.nim).then( (mahasiswa) => {
//         Book.findByIsbnAndInc(req.body.isbn, -1).then((buku) => {

//             const pinjam = new Pinjam({
//                 _idMahasiswa: mahasiswa._id,
//                 _idBuku: buku._id
//             })
//             pinjam.save().then(() => {
//               res.send(pinjam);
//             });
//         })
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// });

module.exports = router;
