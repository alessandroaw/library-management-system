const request = require('supertest');
const app = require('../src/app');
const Book = require('../src/models/book')

const bookOne = {
  "isbn" : "9781491950296",
  "title" : "Programming JavaScript Applications",
  "subtitle" : "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
  "author" : "Eric Elliott",
  "publisher" : "O'Reilly Media",
  "pages" : 254,
  "description" : "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
  "location" : "32A",
  "stock" : 4
}

beforeEach(async () => {
  await Book.deleteMany();
  await new Book(bookOne).save();
})

test('Should post a book', async () => {
  await request(app).post('/book/api').send({
    "isbn" : "9781593275846",
    "title" : "Eloquent JavaScript, Second Edition",
    "subtitle" : "A Modern Introduction to Programming",
    "author" : "Marijn Haverbeke",
    "publisher" : "O'Reilly Media",
    "pages" : 472,
    "description" : "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "location" : "33A",
    "stock" : 4
  }).expect(201)
})

test('Should return book with a certain keyword', async () => {
  const keyword = 'javascript'
  await request(app).get(`/book/api/search?${keyword}`).expect(200)
})
