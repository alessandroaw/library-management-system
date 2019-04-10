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
    website:{
        type: String,
        default:'www.itb.ac.id',
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
// BookSchema.statics.findByKeyword = function (category, keyword){
// 	var Book = this;
//
//   if (category == judul) {
//
//   } else {
//
//   }
//
// 	return Book.find({email}).then((Book) => {
// 		if(!Book){
// 			return Promise.reject();
// 		}
//     return Promise.resolve(Book);
//
//   })
// };

BookSchema.statics.findByIsbn = function (isbn){
    var Book = this;

	return Book.findOne({isbn}).then((Book) => {
		if(!Book){
			return Promise.reject();
		}
        return Promise.resolve(Book);
    }).catch( (e) => {
        return Promise.reject(e);
    })
};

var Book = mongoose.model('books', BookSchema);

module.exports = {Book};
