// const $result = document.getElementById('result');
const $barcodeButton = document.getElementById('barcode-button');
const $bookResult = document.getElementById('book-result')
const $submitButton = document.getElementById('submit-button')
const template = document.querySelector('#template').innerHTML;

var books = [];

$barcodeButton.addEventListener('click', async (e) => {
// $result.addEventListener('change', async (e) => {
  e.preventDefault();
  const isbn = $result.innerText;

  console.log('inside click');
  console.log(isbn);
  
  
  try {
    console.log('try')
    const response = await fetch(`/book/api/${isbn}`,
        {
          method:"GET",
          credentials:"same-origin"
        });

    const book = await response.json();
    
    books.push(book);
    console.log(book)
    
    while ($bookResult.firstChild) $bookResult.removeChild($bookResult.firstChild);
    if(Array.isArray(books) && books.length) {
      const html = Mustache.render(template, {books});
      $bookResult.insertAdjacentHTML('beforeend', html);
    }

    $result.innerText = 'Barcode Read';
    $('#submit-button').focus()

  } catch (e) {
    alert('buku tidak ditemukan');
  }


});

$submitButton.addEventListener('click', (e) => {
  alert('Terima kasih')
})