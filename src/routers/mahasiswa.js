const express = require('express');
const Mahasiswa = require('../models/mahasiswa');
const Book = require('../models/book');
const borrow = require('../models/borrow');
const router = new express.Router();


// Book.findByIsbn('9781491904244').then((buku) => {
//   console.log(buku);

// })

router.get('/mahasiswa/recommendation',(req, res) => {
    res.render('mahasiswa-rekomendasi.ejs');
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

// router.patch('/mahasiswa/return', (req, res) => {
//   Mahasiswa.findByNim(req.body.nim).then((mahasiswa) => {
//     Pinjam.find(_idMahasiswa)
//       Book.findByIsbnAndInc(req.body.isbn, -1).then((buku) => {

//       })
//   }).catch((e) => {
//       res.status(400).send(e);
//   })
// });



// router.get('/mahasiwas/:id', async (req,res) => {
//     //
// });

module.exports = router;
