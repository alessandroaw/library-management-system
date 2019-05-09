const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://libms:reksti04@ds153637.mlab.com:53637/library-management-system';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

module.exports = mongoose;