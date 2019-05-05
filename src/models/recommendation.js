const mongoose = require('mongoose');

var RecommendationSchema = new mongoose.Schema({
  title:{
    type: String,
    unique:true,
    required: true,
    trim: true,
    minlength: 1
  },
  category:{
    type: String,
    trim: true,
    default:'Book',
    minlength: 1
  },
  author:{
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  count:{
    type:Number,
    default:1
  },
  isReference: {
    type: Boolean,
    default: false
  },
});

var Recommendation = mongoose.model('recommendations', RecommendationSchema);

module.exports = Recommendation;
