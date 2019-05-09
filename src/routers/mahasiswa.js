const express = require('express');
const Mahasiswa = require('../models/mahasiswa');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const router = new express.Router();


router.get('/mahasiswa/recommendation',(req, res) => {
    res.render('mahasiswa-rekomendasi.ejs');
})

router.post('/mahasiswa/dev/api', async (req, res) => {
    const mahasiswa = new Mahasiswa(req.body);
    try {
        await mahasiswa.save();
        res.status(201).send(mahasiswa);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/mahasiswa/', (req,res) => {
    res.render('mahasiswa-menu.ejs');    
})

router.get('/mahasiswa/borrow', async (req, res) => {
    res.render('mahasiswa-borrow.ejs');
})


router.get('/mahasiswa/return', async (req, res) => {
    res.render('mahasiswa-return.ejs');
})

module.exports = router;
