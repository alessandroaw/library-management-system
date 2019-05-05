const request = require('supertest');
const app = require('../src/app');
const Recommendation = require('../src/models/recommendation')
const {recommendationOne, setupDatabase} = require('./fixtures/db');


beforeEach(setupDatabase)

test('Should create new recommendation', async () => {
  await request(app).post('/recommendation/api').send({
    title: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
    author: 'J.K. Rowling'   
  }).expect(201)
})

test('Should update count when recomendation existed', async () => {
  const response = await request(app).post('/recommendation/api').send({
    title: recommendationOne.title,
    author: recommendationOne.author
  }).expect(201)
  const recom = await Recommendation.findById(recommendationOne._id)
  
  expect(recom.count).toBe(2);
})

test('Should return book with a certain keyword', async () => {
  const keyword = 'harry potter'
  await request(app).get(`/recommendation/api/suggest?q=${keyword}`).expect(200);
})
