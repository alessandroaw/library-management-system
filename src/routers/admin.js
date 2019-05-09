const express = require('express');
const Book = require('../models/book');
const Admin = require('../models/admin');
const Borrow = require('../models/borrow');
const Recommendation = require('../models/recommendation');
const {authenticate} = require('../middleware/pustakawan-auth');
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

router.get('/admin/stock-opname/report',authenticate, async (req, res) => {
  const data = await Book.find();
  res.render('admin-stock-opname-report.ejs', {data});
})

router.get('/admin/login', (req, res) => {
  res.render('admin-login.ejs')
})

router.get('/admin/stock-opname',authenticate, (req, res) => {
  res.render('admin-stock-opname.ejs')
})

router.get('/admin/sirkulasi',authenticate, async(req, res) => {
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

router.get('/admin/recommendation',authenticate, async (req, res) => {
  const data = await Recommendation.find({}, null, {sort:{count:-1}})
  res.render('admin-rekomendasi.ejs',{data});
})

//POST route for updating data
router.post('/register', (req, res, next) => {
  // confirm that user typed same password twice
  console.log(req.body);
  
  if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
  }

  if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {

      var adminData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
      }

      Admin.create(adminData, function (error, admin) {
      if (error) {
          return next(error);
      } else {
          req.session.adminId = admin._id;
          return res.redirect('/profile');
      }
      });

  } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
  }
})

router.post('/admin/login', async (req, res, next) => { 
  
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    
    try {
      const admin = await Admin.authenticate(email, password);
      req.session.adminId = admin._id;
      res.redirect('/admin/sirkulasi');
    
    } catch (e) {
      e.status = 400;
      next(e);
    }
  } 
})

// GET route after registering
router.get('/profile', authenticate, (req, res) => {
  admin = req.admin;
  res.send(`
    <h1>Name: </h1>${admin.username} 
    <h2>Mail: </h2>${admin.email}<br>
    <a type="button" href="/admin/logout">Logout</a>`)
});

// GET for logout logout
router.get('/admin/logout',  (req, res, next) =>  {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/admin/login');
      }
    });
  }
});


module.exports = router;
