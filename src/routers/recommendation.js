const express = require('express');
const Recommendation = require('../models/recommendation');
const goodreads = require('../utils/goodreads-search');
const router = new express.Router();

// console.log(Recommendation);

// recommendation/api/suggest?q=
router.get('/recommendation/api/suggest', async(req,res) => {
  const keyword = req.query.q;
  const result = await goodreads.getBookSuggestion(keyword);  
  res.status(200).send(result);
});

router.post('/recommendation/api', async (req, res) => {

  console.log(req.body)

  try {
    var response =  await Recommendation.findOneAndUpdate(
      req.body,
      {
        $inc: {
          'count':1
        }
      });
    
    if(!response){
      response = new Recommendation(req.body)
      await response.save();
    }
    res.status(201).send(response)
  } catch (error) {
    
  }

});

module.exports = router;