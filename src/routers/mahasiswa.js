const express = require('express');
const Mahasiswa = require('../models/mahasiswa');
const {authenticate} = require('../middleware/mahasiswa-auth');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const router = new express.Router();

// api
router.post('/mahasiswa/dev/api', async (req, res) => {
    const mahasiswa = new Mahasiswa(req.body);
    try {
        await mahasiswa.save();
        res.status(201).send(mahasiswa);
    } catch (e) {
        res.status(400).send(e);
    }
})
router.get('/mahasiswa/api/:rfid', async (req, res) => {
    const rfid = req.params.rfid;
    const mahasiswa = await Mahasiswa.findByRFID(rfid);
    
    res.status(200).send(mahasiswa) 
})

router.post('/mahasiswa/login', async (req, res) => {
    const rfid = req.body.rfid;
    if (rfid) {
        
        try {
            const mahasiswa = await Mahasiswa.findByRFID(rfid);
            req.session.mahasiswaId = mahasiswa._id;
            res.redirect('/mahasiswa');
        
        } catch (e) {
            res.status(400).send(e);
        }
    }
})

router.get('/mahasiswa/logout',  (req, res, next) =>  {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/mahasiswa/login');
        }
      });
    }
  });

// 
router.get('/mahasiswa/login', (req, res) => {
    res.render('mahasiswa-login.ejs')
  })

router.get('/mahasiswa/recommendation',authenticate,(req, res) => {
    res.render('mahasiswa-rekomendasi.ejs');
})


router.get('/mahasiswa/',authenticate, (req,res) => {
    res.render('mahasiswa-menu.ejs');    
})

router.get('/mahasiswa/borrow',authenticate, async (req, res) => {
    res.render('mahasiswa-borrow.ejs');
})


router.get('/mahasiswa/return',authenticate, async (req, res) => {
    res.render('mahasiswa-return.ejs');
})

module.exports = router;
