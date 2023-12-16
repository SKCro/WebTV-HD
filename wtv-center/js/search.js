function search(event) {
  event.preventDefault();
  setTimeout(function() {
    var query = document.getElementById('q').value;
    window.open("https://google.com/search?q=" + query, '_new');
  }, 235);
}