document.addEventListener('DOMContentLoaded', () => {
  const selectionBox = document.querySelector('.selection-box');
  let selectedElement = null;

  // Function to update the selection box position and size
  function updateSelectionBox() {
	  if (selectedElement) {
	    const elementRect = selectedElement.getBoundingClientRect();
	    const boxMargin = 5; // Adjust this value to set the margin between the selected element and the selection box

	    // Calculate the new dimensions and position for the selection box
	    const top = elementRect.top - boxMargin;
	    const left = elementRect.left - boxMargin;
	    const width = elementRect.width + 2 * boxMargin;
	    const height = elementRect.height + 2 * boxMargin;

	    // Apply the new dimensions and position to the selection box
	    selectionBox.style.top = top + 'px';
	    selectionBox.style.left = left + 'px';
	    selectionBox.style.width = width + 'px';
	    selectionBox.style.height = height + 'px';

	    // Remove the "display: none;" style to make the selection box visible
	    selectionBox.style.display = 'block';
	  } else {
	    // If no selected element, hide the selection box
	    selectionBox.style.display = 'none';
	  }
	}

  // Function to check if an element is interactive (clickable)
  function checkIfInteractive(element) {
    return (
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
    const interactiveElements = Array.from(document.querySelectorAll('*')).filter(
      checkIfInteractive
    );
    return interactiveElements;
  }

  // Function to find the nearest interactive element to a given position
  function findNearestInteractiveElement(x, y) {
    const interactiveElements = getInteractiveElements();
    let nearestElement = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (const element of interactiveElements) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance < minDistance) {
        minDistance = distance;
        nearestElement = element;
      }
    }

    return nearestElement;
  }

  // Event listener to update the selection box on page load and resize
  window.addEventListener('load', updateSelectionBox);
  window.addEventListener('resize', updateSelectionBox);

  // Event listener for mouse click to select an element
  document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (checkIfInteractive(clickedElement)) {
      selectedElement = clickedElement;
      updateSelectionBox();
    }
  });

  // Event listener for arrow keys to move the selection box
  document.addEventListener('keydown', (event) => {
  });
});