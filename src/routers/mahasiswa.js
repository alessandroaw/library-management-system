const express = require('express');
const {Mahasiswa} = require('../models/mahasiswa');
const {Book} = require('../models/book');
const {Pinjam} = require('../models/pinjam');
const router = new express.Router();


// Book.findByIsbn('9781491904244').then((buku) => {
//   console.log(buku);

// })

router.get('/mahasiswa/a',(req, res) => {
    res.send('from node js');
})

router.get('/mahasiswa/pinjam', (req, res) => {

    Mahasiswa.findByNim(req.body.nim).then( (mahasiswa) => {
        Book.findByIsbn(req.body.isbn).then((buku) => {

            const pinjam = new Pinjam({
                _idMahasiswa: mahasiswa._id,
                _idBuku: buku._id
            })
            console.log(pinjam);
            pinjam.save()
        })
    }).catch((e) => {
        res.status(400).send(e);
    })

});



// router.get('/mahasiwas/:id', async (req,res) => {
//     //
// });

module.exports = router;
