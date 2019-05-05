const mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    // =============================
    // REQUIRED
    // =============================
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
    description:{
        type: String,
        trim: true,
        minlength: 1
    },
    category:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        default:'Book'
    },
    author:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    // =============================
    // DEFAULT SET
    // =============================
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
    goodCondition:{
        type: Number,
        default: 4
    },
    badCondition:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 4
    },
    total:{
        type: Number,
        default: 4
    },
    location:{
        type: String,
        default: '3-12A',
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

BookSchema.statics.findByIsbnAndInc = async function(isbn, inc) {
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
