const mongoose = require('mongoose')
const Book = require('../../src/models/book')
const Recommendation = require('../../src/models/recommendation')

// const bookOneId = new mongoose.Types.ObjectId()
const bookOne = {
  // _id: bookOneId,
  isbn: "9781491904244",
  title: "You Don't Know JS",
  category:"Buku",
  author: "Kyle Simpson",
  published: new Date("2015-12-27T00:00:00.000Z"),
  publisher: "O'Reilly Media",
  description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \"You Don’t Know JS\" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.",
  goodCondtion:4,    
  badCondtion:0,    
  stock:4,    
  total:4,    
  location:"3-12A"  
}
const recommendationOneId = new mongoose.Types.ObjectId()
const recommendationOne = {
  _id: recommendationOneId,
  title: "HP 1",
  author: "JK Rowling"
}
const setupDatabase = async () => {
    await Book.deleteMany();
    await Recommendation.deleteMany();
    await new Book(bookOne).save();
    await new Recommendation(recommendationOne).save();
}

module.exports = {
  bookOne,
  recommendationOne,
  setupDatabase
}