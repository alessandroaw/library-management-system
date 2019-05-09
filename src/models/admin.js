var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

AdminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.passwordConf;

  return adminObject;

}

//authenticate input against database
AdminSchema.statics.authenticate = async function (email, password) {
  
  const admin = await Admin.findOne({email});
  
  if(!admin){
    throw new Error('Unable to login');
  }

  const match = await bcrypt.compare(password, admin.password);

  if(!match){
    throw new Error('Unable to login')
  }
  
  return admin;
}

//hashing a password before saving it to the database
AdminSchema.pre('save', async function (next) {
  const admin = this;
  
  if(admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }

  next();

});


var Admin = mongoose.model('Admins', AdminSchema);
module.exports = Admin;
