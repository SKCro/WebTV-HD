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

// selection box

document.addEventListener('DOMContentLoaded', function () {
  var selectionBox = document.getElementById('selectionbox');
  var selectedElement = null;

  // Update the selection box position and size
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

  function updateSelectionBoxScroll() { // going to try to use this to fix the scrolling issue
    if (selectedElement) {
      var elementRect = selectedElement.getBoundingClientRect();
      var boxMargin = 4;

      var left = elementRect.left - boxMargin;
      var width = elementRect.width + 2 * boxMargin;
      var height = elementRect.height + 2 * boxMargin;

      selectionBox.style.left = left + 'px';
      selectionBox.style.width = width + 'px';
      selectionBox.style.height = height + 'px';
      selectionBox.style.display = 'block';
    } else {
      selectionBox.style.display = 'none';
    }
  }

  // Function to check if an element is interactive (clickable)
  function checkIfInteractive(element) {
    return (
      element.classList.contains('clickable') ||
      element.classList.contains('submit') ||
      element.tagName === 'A' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.isContentEditable
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
  window.addEventListener('load', resetSelectionBox);
  window.addEventListener('resize', updateSelectionBoxNoGreen);
  window.addEventListener('scroll', updateSelectionBoxScroll);

  // Event listener for mouse click to select an element
  document.addEventListener('click', function(event) {
    var clickedElement = event.target;
    if (checkIfInteractive(clickedElement) && clickedElement !== selectedElement) {
      selectedElement = clickedElement;
      updateSelectionBox();
    } else { updateSelectionBoxNoGreen(); }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default tab behavior

      var interactiveElements = getInteractiveElements();
      var index = interactiveElements.indexOf(selectedElement);

      // Check if Shift key is pressed for reverse navigation
      if (event.shiftKey) {
        selectedElement = interactiveElements[(index - 1 + interactiveElements.length) % interactiveElements.length];
      } else {
        selectedElement = interactiveElements[(index + 1) % interactiveElements.length];
      }
      updateSelectionBoxNoGreen();
    } else if (event.key === 'Enter') {
      if (selectedElement) {
        if (selectedElement.tagName === 'INPUT' && selectedElement.type === 'text') {
          updateSelectionBox();
          selectedElement.focus();
        } else {
          updateSelectionBox();
          selectedElement.click();
        }
      }
    }
  });
});

// dialog logic

function resetSelectionBox() {
  document.getElementById('selectionbox').style.display = 'none';
}

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
	resetSelectionBox();
	}, 2);
}

function closeDialog() {
  setTimeout(function() {
    var dialog = document.getElementById('webtv-dialog');
    var dialogContainer = document.querySelector('.dialog-overlay');
    var selectionBox = document.getElementById('selectionbox');
    dialog.removeAttribute('open');
    dialogContainer.style.display = 'none';
    resetSelectionBox();
  }, 1);
}

// link handler - makes sure that links don't get activated until the selection box sound plays

function linkHandler(url) {
  setTimeout(function() {
    location.href = url;
  }, 235);
}

// Navigation stuff for iframe setup

// Attempt at making loading progress indicators work
document.addEventListener('progress', function(event) {
  if (event.lengthComputable) {
    const percentLoaded = (event.loaded / event.total) * 100;
    window.parent.postMessage({ type: 'loading', progress: percentLoaded }, '*');
  }
});

// redirect if the user isn't using the iframe page
window.addEventListener('load', function() {
  if (window.self == window.top) {
    window.location.href = 'index.html';
  }
});