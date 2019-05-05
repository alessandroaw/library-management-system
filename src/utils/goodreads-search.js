const rp = require('request-promise-native');
const qs = require('query-string');
const converter = require('xml-js');
const _ = require('lodash');

const GOODREADS_API_KEY = `vQ9M0xpG5Ln4fdxV4AwdQ`;

// const k = 'David Baldacci';

const getBookSuggestion = async (keyword) => {
  
  const apiOptions = qs
  .stringify({
    key:GOODREADS_API_KEY,
    q:keyword
  });

  var URI = `https://www.goodreads.com/search/index.xml?${apiOptions}`

  var options = {
    uri: URI
  }
  try {
    var result = await rp(options);
  } catch (error) {
    throw error;
  }
  
  const resultJSON = converter.xml2js(result, {compact: true, spaces: 4})
  // console.log(resultJSON);
  
  const work = resultJSON
    .GoodreadsResponse
    .search
    .results
    .work;

  // const books = work.map((w) => w.best_book)
  const books = work.map((w) => {
    return {
      title: w.best_book.title._text,
      author: w.best_book.author.name._text,
      image: w.best_book.small_image_url._text
      }
  })

  return books;
  
}

module.exports = {getBookSuggestion}