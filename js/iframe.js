function showOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  var panelUp = document.getElementById('panelUp');
  var selectionBox = document.getElementById('selectionbox');
  selectionBox.style.display = 'none';
  panelUp.currentTime = 0;
  panelUp.play();
  optionsBar.classList.remove('hiding');
  optionsBar.classList.remove('hide');
  optionsBar.classList.add('show');
  // make sure options bar sticks after animating
  setTimeout(function() {
    optionsBar.classList.add('showing');
  }, 395);
}

function hideOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  var panelDown = document.getElementById('panelDown');
  var selectionBox = document.getElementById('selectionbox');
  selectionBox.style.display = 'none';
  panelDown.currentTime = 0;
  panelDown.play();
  optionsBar.classList.remove('showing');
  optionsBar.classList.remove('show');
  optionsBar.classList.add('hide');
  // ditto
  setTimeout(function() {
    optionsBar.classList.add('hiding');
  }, 395);
}

function hideOptionsBarNoSound() {
  var optionsBar = document.getElementById('options-bar');
  optionsBar.classList.remove('showing');
  optionsBar.classList.remove('show');
  optionsBar.classList.add('hide');
  // ditto
  setTimeout(function() {
    optionsBar.classList.add('hiding');
  }, 395);
}

function toggleOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  if (optionsBar.classList.contains('show')) {
    hideOptionsBar();
  } else {
    showOptionsBar();
  }
}

// Top row buttons

function home() {
  document.getElementById("mainFrame").src = 'iframeTest2.html';
}

function find() {
  var iframe = document.getElementById("mainFrame");
  var searchTerm = prompt("Find word:");
  if (searchTerm) {
    var found = iframe.contentWindow.find(searchTerm);
    if (!found) {
      alert("Could not find the word on this page.");
    } else {
      iframe.contentWindow.getSelection().removeAllRanges();
    }
  }
}

function info() {
  
}

function goTo() {
  document.getElementById("mainFrame").src = 'https://google.com';
}

function save() {
  
}

function send() {
  
}

// Bottom row buttons

function messenger() {
  
}

function print() {
  hideOptionsBarNoSound();
  var selectionBox = document.getElementById('selectionbox');
  selectionBox.style.display = 'none';
  setTimeout(function(){document.getElementById("mainFrame").contentWindow.print();},395);
}

function hangUp() {
  
}

function reload() {
  document.getElementById("mainFrame").contentWindow.location.reload();
}

function pip() {
  
}