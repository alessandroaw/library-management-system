const express = require('express');
const Mahasiswa = require('../models/mahasiswa');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const router = new express.Router();
const sessionMahasiswaId = '5ccea7f905298b60f740aa6e';

var calculateFine = (result) => {
  const dateDiff = new Date(result.dueDate).getDate() - new Date().getDate();
  const fine = (dateDiff) > 0? dateDiff*1000 : 0;
  return fine;   
}

router.post('/borrow/api', async (req, res) => {
  const body = req.body;
  const mahasiswaId = body.mahasiswaId;
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

router.post('/borrow/api/br', async (req, res) => {
  // move variable
  console.log('masuk borrow post api')
  var check = req.body.checkedBooks;
  const mahasiswaId = sessionMahasiswaId;
  console.log(check);

  try {
    // if array do multiple update and insert
    if(Array.isArray(check) && check.length) {
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
      console.log('temp');
      console.log(temp);
      
      // Insert Borrow Document
      const borrows = check.map( (check) => {
        return new Borrow({
          _idBuku:check,
          _idMahasiswa: mahasiswaId
        });
      })
      var result = await Borrow.insertMany(borrows);
      console.log(result);
      
    } else{
      // update book stock
      var temp = await Book.update(
        {
          _id:check
        },{
          $inc:{
            'stock':-1  
          }
        });
        // insert Borrow document
      const borrow = new Borrow({
        _idBuku:check,
        _idMahasiswa: mahasiswaId
      })
      var result = await borrow.save();
      console.log(result)
    }  
  } catch (e) {
    res.status(400).send(e);
  }

  res.redirect('/mahasiswa/')
})


router.post('/borrow/api/rt', async (req, res) => {
  console.log('masuk return post api')
  var check = req.body.checkedBooks;
  const mahasiswaId = sessionMahasiswaId;
  console.log(check);

  try {
    if(Array.isArray(check) && check.length) {
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
      
      // Find borrow with key ==> (mahasiswaID, check[i])
      Borrow.find({
        $and:[
          {_idMahasiswa:mahasiswaId},
          {_idBuku:{$in:check}},
          {isReturned: false}
        ]
      }).then((docs) => {
        docs.forEach(async(doc) => {
          const fine = calculateFine(doc);
          const result = await Borrow.update({
            doc
          },{
            $set:{
              isReturned: true,
              returnDate: new Date(),
              fine: fine
            }
          })
          console.log(result);
          
        });
      })

    } else{
      var temp = await Book.update(
        {
          _id:check
        },{
          $inc:{
            'stock':1  
          }
        });

      const temmp = await Borrow.find({
          $and:[
            {_idMahasiswa:mahasiswaId},
            {_idBuku:check},
            {isReturned:false}
          ]
        });
      
        const fine = calculateFine(temp);
      
        const result = await Borrow.update({
          _id:result._id
        },{
          $set:{
            isReturned: true,
            returnDate: new Date(),
            fine: fine
          }
        })
      console.log(result)
    }  
  } catch (e) {
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
