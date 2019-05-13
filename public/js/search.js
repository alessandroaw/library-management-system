const $bookForm = document.querySelector('form');
const $search = document.querySelector('input');
const $searchResult = document.querySelector('#search-result');
const $paginate = document.querySelector('#paginate');
const template = document.querySelector('#template').innerHTML;
// const next = document.getElementById('next');

$bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    while ($searchResult.firstChild) $searchResult.removeChild($searchResult.firstChild);

    var keyword = $search.value;

    try {
      var response = await fetch(`/book/api/search?q=${keyword}`);
      var data = await response.json();

      if(Array.isArray(data) && data.length) {
        data = data.map((d) => {
          var publishedYear = new Date(d.published).getFullYear();
          return {
            _id: d._id,
            title: d.title,
            author: d.author,
            image: d.image,
            category: d.category,
            published: publishedYear
          };
        })
        const html = Mustache.render(template, {books:data});
        $searchResult.insertAdjacentHTML('beforeend', html);
      } else{
        throw new Error('not found');
      }

    } catch (errorMessage) {
      console.log(errorMessage)
      var errorMessage = '<h3> Buku tidak ditemukan </h3>';
      const html = Mustache.render(errorMessage);
      $searchResult.insertAdjacentHTML('beforeend', html);
    }

})

// $paginate.addEventListener('onclick')
