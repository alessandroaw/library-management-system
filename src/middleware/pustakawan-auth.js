var Admin = require('../models/admin');

const authenticate = (req, res, next) => {
  Admin.findById(req.session.adminId)
  .then((admin) => {
    if(!admin) {
      throw new Error('not found');
    }
    req.admin = admin;
    next();
  }).catch((e) => {
    res.redirect('/admin/login');
  });
}

const notAuthenticate = (req, res, next) => {
  if(req.session.adminID){
    res.redirect('/profile')
  } else {
    next();
  }
}

module.exports = {authenticate, notAuthenticate}