document.addEventListener('DOMContentLoaded', function () {
  var selectionBox = document.querySelector('.selection-box');
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

  // Event listener to update the selection box on page load and resize
  window.addEventListener('load', updateSelectionBoxNoGreen);
  window.addEventListener('resize', updateSelectionBoxNoGreen);
  window.addEventListener('scroll', updateSelectionBoxNoGreen);

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
    // code for arrow keys goes here later
  });
});