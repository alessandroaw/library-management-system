const request = require('supertest');
const app = require('../src/app');
const Book = require('../src/models/book')

const bookOne = {
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

beforeEach(async () => {
  await Book.deleteMany();
  await new Book(bookOne).save();
})

test('Should post a book', async () => {
  await request(app).post('/book/api').send({
    isbn: "9781449337711",
    title: "Designing Evolvable Web APIs with ASP.NET",
    category:"Buku",
    author: "Glenn Block, et al.",
    published: new Date("2014-04-07T00:00:00.000Z"),
    publisher: "O'Reilly Media",
    description: "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.",
    goodCondtion:4,    
    badCondtion:0,    
    stock:4,    
    total:4,    
    location:"3-12A"    
  }).expect(201)
})

test('Should return book with a certain keyword', async () => {
  const keyword = 'js'
  await request(app).get(`/book/api/search?${keyword}`).expect(200)
})
