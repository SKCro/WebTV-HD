// Button sounds

document.addEventListener('DOMContentLoaded', function () {
  var inputSound = document.getElementById('inputSound');
  var inputs = document.querySelectorAll('.input');
  var clickSound = document.getElementById('clickSound');
  var clickableButtons = document.querySelectorAll('.clickable');
  var submitInputs = document.querySelectorAll('.submit');
  var submitSound = document.getElementById('submitSound');
  var inputNoSound = document.querySelectorAll('.inputNoSound');

  function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  function playInputSound() {
    inputSound.currentTime = 0;
    inputSound.play();
  }

  function playSubmitSound() {
    submitSound.currentTime = 0;
    submitSound.play();
  }
  
  function preventSound() {
    inputSound.pause();
  }

  // Loop through clickableButtons and attach event listeners
  for (var i = 0; i < clickableButtons.length; i++) {
    clickableButtons[i].addEventListener('click', playClickSound);
  }

  for (var j = 0; j < inputs.length; j++) {
    inputs[j].addEventListener('click', playInputSound);
  }

  for (var k = 0; k < submitInputs.length; k++) {
    submitInputs[k].addEventListener('click', playSubmitSound);
  }

  for (var l = 0; l < inputNoSound.length; l++) {
    inputNoSound[l].addEventListener('click', preventSound);
  }

});

// page name updater

document.addEventListener('DOMContentLoaded', function () {
  var pageTitleElement = document.querySelector('.page-name');

  function updatePageName() {
    var pageTitle = document.title;
    pageTitleElement.textContent = pageTitle;
  }

  updatePageName();

  var observer = new MutationObserver(function () {
    updatePageName();
  });

  observer.observe(document.querySelector('title'), { subtree: true, characterData: true, childList: true });
});

// selection box

document.addEventListener('DOMContentLoaded', function () {
  var selectionBox = document.getElementById('selectionbox');
  var selectedElement = null;

  // Function to update the selection box position and size
  function updateSelectionBox() {
    if (selectedElement) {
      var elementRect = selectedElement.getBoundingClientRect();
      var boxMargin = 4; // Adjust this value to set the margin between the selected element and the selection box

      // Calculate the new dimensions and position for the selection box
      var top = elementRect.top - boxMargin;
      var left = elementRect.left - boxMargin;
      var width = elementRect.width + 2 * boxMargin;
      var height = elementRect.height + 2 * boxMargin;

      // Apply the new dimensions and position to the selection box
      selectionBox.style.top = top + 'px';
      selectionBox.style.left = left + 'px';
      selectionBox.style.width = width + 'px';
      selectionBox.style.height = height + 'px';
      selectionBox.style.display = 'block';

      // Switch to the green substyle for 100ms upon click
      if (!selectedElement.classList.contains('input')) {
        selectionBox.classList.add('green');
        setTimeout(function () {
          selectionBox.classList.remove('green');
        }, 100);
      }
    } else {
      selectionBox.style.display = 'none';
    }
  }

  function updateSelectionBoxNoGreen() {
    if (selectedElement) {
      var elementRect = selectedElement.getBoundingClientRect();
      var boxMargin = 4;

      var top = elementRect.top - boxMargin;
      var left = elementRect.left - boxMargin;
      var width = elementRect.width + 2 * boxMargin;
      var height = elementRect.height + 2 * boxMargin;

      selectionBox.style.top = top + 'px';
      selectionBox.style.left = left + 'px';
      selectionBox.style.width = width + 'px';
      selectionBox.style.height = height + 'px';
      selectionBox.style.display = 'block';

    } else {
      selectionBox.style.display = 'none';
    }
  }

  function updateSelectionBoxScroll() { // same as noGreen for now - going to try to use this to fix the scrolling issue
    if (selectedElement) {
      var elementRect = selectedElement.getBoundingClientRect();
      var boxMargin = 4;

      var top = elementRect.top - boxMargin;
      var left = elementRect.left - boxMargin;
      var width = elementRect.width + 2 * boxMargin;
      var height = elementRect.height + 2 * boxMargin;

      selectionBox.style.top = top + 'px';
      selectionBox.style.left = left + 'px';
      selectionBox.style.width = width + 'px';
      selectionBox.style.height = height + 'px';
      selectionBox.style.display = 'block';

    } else {
      selectionBox.style.display = 'none';
    }
  }

  function clearSelectionBox() {
	  selectionBox.style.display = 'none';
  }

  // Function to check if an element is interactive (clickable)
  function checkIfInteractive(element) {
    return (
      element.classList.contains('clickable') ||
      element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'SELECT' ||
      element.tagName === 'TEXTAREA' ||
      element.isContentEditable ||
      element.getAttribute('role') === 'button'
    );
  }

  // Function to get all interactive elements on the page
  function getInteractiveElements() {
    var allElements = document.querySelectorAll('*');
    var interactiveElements = [];
    for (var i = 0; i < allElements.length; i++) {
      if (checkIfInteractive(allElements[i])) {
        interactiveElements.push(allElements[i]);
      }
    }
    return interactiveElements;
  }

  // Function to find the nearest interactive element to a given position
  
/*
  function findNearestInteractiveElement(x, y) {
    var interactiveElements = getInteractiveElements();
    var nearestElement = null;
    var minDistance = Number.MAX_SAFE_INTEGER;

    for (var i = 0; i < interactiveElements.length; i++) {
      var element = interactiveElements[i];
      var rect = element.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance < minDistance) {
        minDistance = distance;
        nearestElement = element;
      }
    }

    return nearestElement;
  } */

  // Event listener to update the selection box for various events
  window.addEventListener('load', clearSelectionBox);
  window.addEventListener('resize', updateSelectionBoxNoGreen);
  window.addEventListener('scroll', updateSelectionBoxScroll);

  // Event listener for mouse click to select an element
  document.addEventListener('click', function (event) {
    var clickedElement = event.target;
    if (checkIfInteractive(clickedElement) && clickedElement !== selectedElement) {
      selectedElement = clickedElement;
      updateSelectionBox();
    }
  });

  // Event listener for arrow keys to move the selection box
  document.addEventListener('keydown', function (event) {
    // code for arrow keys goes here eventually
  });
});

// dialog logic

function openDialog() {
  var dialog = document.getElementById('webtv-dialog');
  var dialogContainer = document.querySelector('.dialog-overlay');
  var selectionBox = document.getElementById('selectionbox');
  var errorSound = document.getElementById('errorSound');
  setTimeout(function() {
    errorSound.currentTime = 0;
    errorSound.play();
    dialog.setAttribute('open', 'true');
    dialogContainer.style.display = 'unset';
	selectionBox.style.display = 'none';
	}, 2);
}

function closeDialog() {
  setTimeout(function() {
    var dialog = document.getElementById('webtv-dialog');
    var dialogContainer = document.querySelector('.dialog-overlay');
    var selectionBox = document.getElementById('selectionbox');
    dialog.removeAttribute('open');
    dialogContainer.style.display = 'none';
    selectionBox.style.display = 'none';
  }, 1);
}

// link handler - makes sure that links don't get activated until the selection box sound plays

function linkHandler(url) {
  setTimeout(function() {
    location.href = url;
  }, 235);
}

// mobile stuff

// sidebar stuff

// show sidebar

function showSidebar() {
  var sidebar = document.querySelector('.sidebar');
  var panelUp = document.getElementById('panelUp');
  panelUp.currentTime = 0;
  panelUp.play();
  sidebar.classList.remove('hiding');
  sidebar.classList.remove('hide');
  sidebar.classList.add('show');
  // make sure sidebar sticks after animating
  setTimeout(function() {
    sidebar.classList.add('showing');
  }, 400);
}

// hide sidebar

function hideSidebar() {
  var sidebar = document.querySelector('.sidebar');
  var panelDown = document.getElementById('panelDown');
  panelDown.currentTime = 0;
  panelDown.play();
  sidebar.classList.remove('showing');
  sidebar.classList.remove('show');
  sidebar.classList.add('hide');
  // ditto
  setTimeout(function() {
    sidebar.classList.add('hiding');
  }, 400);
}

// toggle sidebar

function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  if (sidebar.classList.contains('show')) {
    hideSidebar();
  } else {
    showSidebar();
  }
}