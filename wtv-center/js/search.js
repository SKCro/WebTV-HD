function search(event) {
  event.preventDefault(); // Prevent default form submission behavior
  setTimeout(() => {
    var query = document.getElementById('q').value;
    location.href = 'https://google.com/search?q=' + query;
  }, 235);
}