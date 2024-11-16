function search(event) {
  event.preventDefault();
  setTimeout(function() {
    var query = document.getElementById('q').value;
    window.location = "https://theoldnet.com/get?url=" + query, '&year=1999&scripts=false&decode=false';
  }, 235);
}
