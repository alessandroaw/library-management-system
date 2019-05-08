const mongoose = require('mongoose');

var nextWeek = () => {
    today = new Date();
    return new Date(today.getTime() + 7*24*60*60*1000);
}

var BorrowSchema = new mongoose.Schema({
  _idMahasiswa:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mahasiswas',
    required: true
	},
  _idBuku:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books',
    required: true
	},
  date: {
    type: Date,
    default: new Date()
  },
  dueDate: {
      type: Date,
      default: nextWeek()
  },
  returnDate: {
    type: Date,
    default: null
  },
  isReturned: {
    type: Boolean,
    default: false
  },
  fine: {
    type: Number,
    default: 0
  }
});

// BorrowSchema.pre('update', function (next) {
//   const borrow = this;
//   console.log(borrow._id);
//   console.log(borrow.isReturned);
  
//   next();
// });

var Borrow = mongoose.model('borrows', BorrowSchema);

module.exports = Borrow;
