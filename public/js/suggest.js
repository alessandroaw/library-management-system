const $bookForm = document.getElementById('book-form');
const $search = document.querySelector('input');
var $button = null;
const $searchResult = document.querySelector('#search-result');
const $paginate = document.querySelector('#paginate');
const template = document.querySelector('#template').innerHTML;
// const next = document.getElementById('next');
var temp = [];

$bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    while ($searchResult.firstChild) $searchResult.removeChild($searchResult.firstChild);

    var keyword = $search.value;

    try {
      var response = await fetch(`/recommendation/api/suggest?q=${keyword}`);
      var data = await response.json();

      
      if(Array.isArray(data) && data.length) {
        temp = data;
        for (let index = 0; index < data.length; index++) {
          data[index].index = index;
        }
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

document.addEventListener('click', async (e) => {
  if(e.target && e.target.localName === "button"){
    $button = e.target;
    const i = $button.value;
    const recom = {
      title: temp[i].title,
      author: temp[i].author,
      published_year: temp[i].published_year
    }
    await fetch(`/recommendation/api/`,
      {
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(recom)
      });
    alert(`Kamu merekomendasikan ${recom.title}`)

    $button.disabled = true;
  }
})
