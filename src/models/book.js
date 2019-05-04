const mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    isbn:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1
    },
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    subtitle:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    author:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description:{
        type: String,
        trim: true,
        minlength: 1
    },
    stock:{
        type: Number,
        default: 1
    },
    publisher:{
        type: String,
        default: 'Penerbit ITB',
        trim: true,
        minlength: 1
    },
    published:{
        type: Date,
        default: new Date(),
        trim: true,
        minlength: 1
    },
    pages:{
        type: Number,
        default: 100,
        min:1
    },
    location:{
        type: String,
        default: '33A',
        trim: true,
        minlength: 1
        }
    });

BookSchema.statics.findByIsbn = async function (isbn){
    
    const book = await Book.findOne({isbn});

    if(!book){
        throw new Error('Book not found');
    }

    return book;
};

BookSchema.statics.findByIsbnAndInc = function(isbn, inc) {
  var Book = this;

  return Book.findOneAndUpdate(
    {isbn},
    {$inc:{stock:inc}}
    ).then((Book) => {
    if(!Book){
      return Promise.reject();
    }
    return Promise.resolve(Book);
  }).catch( (e) => {
      return Promise.reject(e);
  })
}

var Book = mongoose.model('books', BookSchema);

module.exports = Book;
