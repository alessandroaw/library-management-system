var Mahasiswa = require('../models/mahasiswa');

const authenticate = (req, res, next) => {
  Mahasiswa.findById(req.session.mahasiswaId)
  .then((mahasiswa) => {
    if(!mahasiswa) {
      throw new Error('not found');
    }
    req.mahasiswa = mahasiswa;
    next();
  }).catch((e) => {
    res.redirect('/mahasiswa/login');
  });
}

const notAuthenticate = (req, res, next) => {
  if(req.session.mahasiswaID){
    res.redirect('/profile')
  } else {
    next();
  }
}

module.exports = {authenticate, notAuthenticate}