// Page name updater

document.addEventListener('DOMContentLoaded', function () {
  var parentTitle = document.querySelector('.page-name');
  var iframe = document.getElementById('mainFrame');
  function updatePageName() {
    if (iframe.contentDocument) {
      var iframeTitle = iframe.contentDocument.title;
      parentTitle.textContent = iframeTitle;
      document.title = iframeTitle;
    }
  }
  function waitForIframeLoad() {
    if (iframe && iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      updatePageName();
    } else {
      setTimeout(waitForIframeLoad, 100);
    }
  }
  iframe.addEventListener('load', function () {
    waitForIframeLoad();
  });
});

/* Original code, only here for reference

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

*/

// Options bar stuff

function showOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  var statusBar = document.querySelector('.status-bar.iframe');
  var panelUp = document.getElementById('panelUp');
  var panel = document.getElementById('panel');
  if (panel.classList.contains('showing')) { closePanel(); }
  resetSelectionBox();
  panelUp.currentTime = 0;
  panelUp.play();
  optionsBar.classList.remove('hiding');
  optionsBar.classList.remove('hide');
  optionsBar.classList.add('show');
  statusBar.classList.remove('hiding');
  statusBar.classList.remove('hide');
  statusBar.classList.add('show');
}

function hideOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  var statusBar = document.querySelector('.status-bar.iframe');
  var panelUp = document.getElementById('panelUp');
  resetSelectionBox();
  panelDown.currentTime = 0;
  panelDown.play();
  optionsBar.classList.remove('showing');
  optionsBar.classList.remove('show');
  optionsBar.classList.add('hide');
  statusBar.classList.remove('showing');
  statusBar.classList.remove('show');
  statusBar.classList.add('hide');
}

function hideOptionsBarNoSound() {
  setTimeout(function() {
    var optionsBar = document.getElementById('options-bar');
    var statusBar = document.querySelector('.status-bar.iframe');
    resetSelectionBox();
    optionsBar.classList.remove('showing');
    optionsBar.classList.remove('show');
    optionsBar.classList.add('hide');
    statusBar.classList.remove('showing');
    statusBar.classList.remove('show');
    statusBar.classList.add('hide');
  },20);
}

function toggleOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  if (optionsBar.classList.contains('show')) {
    hideOptionsBar();
  } else {
    showOptionsBar();
  }
}

function resetSelectionBox() {
  document.getElementById('selectionbox').style.top = '9999rem';
}

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 46) {
    toggleOptionsBar();
  }
});

// Top row buttons

function home() {
  hideOptionsBarNoSound();
  document.getElementById("mainFrame").src = 'Home.html';
}

function find() {
  hideOptionsBarNoSound();
  var iframe = document.getElementById("mainFrame");
  function openFindPanel() {
    var panel = document.getElementById('panel');
    var textInput = document.getElementById('textQuery');
    document.getElementById('top-input-pretext').textContent = 'Find word';
    document.getElementById('top-input-pretext').style.color = 'var(--webtv-yellow)';
    document.getElementById('bottom-message').textContent = '';
    textInput.value = '';
    textInput.placeholder = '';
    document.getElementById('panelSubmit').textContent = 'Find on Page';
    document.getElementById('panelSubmit').onclick = findInIframe;
    document.getElementById('panelClear').onclick = clearFindBox;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');document.getElementById('panelSlide').play();},395);
  }
  function clearFindBox() {
    event.preventDefault();
    document.getElementById('textQuery').value = '';
  }
  function findInIframe() {
    iframe.document.find(textInput.value);
    hideOptionsBarNoSound();
  }
  openFindPanel();
}

function info() {
  hideOptionsBarNoSound();
}

function goTo() {
  hideOptionsBarNoSound();
  function openGoToPanel() {
    var panel = document.getElementById('panel');
    var textInput = document.getElementById('textQuery');
    document.getElementById('top-input-pretext').textContent = 'Address';
    document.getElementById('top-input-pretext').style.color = 'var(--webtv-yellow)';
    document.getElementById('bottom-message').textContent = '';
    textInput.type = 'url';
    textInput.value = 'http://';
    textInput.placeholder = '';
    document.getElementById('panelSubmit').textContent = 'Go to Page';
    document.getElementById('panelSubmit').onclick = goToURL;
    document.getElementById('panelClear').onclick = clearURL;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');document.getElementById('panelSlide').play();},395);
  }
  function goToURL(event) {
    event.preventDefault();
    var destUrl = document.getElementById('textQuery').value;
    var iframe = document.getElementById('mainFrame');
    if (destUrl !== 'http://' && destUrl !== 'https://' && destUrl !== '') {
      iframe.src = destUrl;
      closePanel();
    } else { 
      document.getElementById('bottom-message').textContent = 'Type the address of a webpage.';
      document.getElementById('errorSound').currentTime = 0;
      document.getElementById('errorSound').play(); 
    }
  }
  function clearURL() {
    event.preventDefault();
    document.getElementById('textQuery').value = 'http://';
  }
  openGoToPanel();
}

function save() {
  hideOptionsBarNoSound();
  var iframe = document.getElementById("mainFrame");
  var textInput = document.getElementById('textQuery');
  function openSavePanel() {
    var panel = document.getElementById('panel');
    document.getElementById('top-input-pretext').textContent = '';
    document.getElementById('bottom-message').textContent = 'To save this page, press Ctrl+D on your keyboard.';
    document.getElementById('bottom-message').style.bottom = '18.5vw';
    document.getElementById('panelCancel').style.display = 'none';
    document.getElementById('panelClear').style.display = 'none';
    textInput.value = '';
    textInput.placeholder = '';
    textInput.style.display = 'none';
    document.getElementById('panelSubmit').style.top = 'unset';
    document.getElementById('panelSubmit').textContent = 'Continue';
    document.getElementById('panelSubmit').onclick = closePanel;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');document.getElementById('panelSlide').play();},395);
  }
  openSavePanel();
}

function send() {
  hideOptionsBarNoSound();
  var iframe = document.getElementById('mainFrame');
  var textInput = document.getElementById('textQuery');
  function openSendPanel() {
    var panel = document.getElementById('panel');
    document.getElementById('top-input-pretext').textContent = 'To:';
    document.getElementById('top-input-pretext').style.color = 'var(--webtv-link)';
    document.getElementById('bottom-message').textContent = 'Send "' + document.title + '" by electronic mail.';
    textInput.value = '';
    document.getElementById('panelSubmit').textContent = 'Send Page';
    document.getElementById('panelSubmit').onclick = doSend;
    document.getElementById('panelClear').onclick = clearEmail;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');document.getElementById('panelSlide').play();},395);
  }
  function clearEmail() {
    event.preventDefault();
    document.getElementById('textQuery').value = '';
  }
  function doSend() {
    window.open('mailto:' + textInput.value + '?body=' + encodeURIComponent(iframe.src), '_blank');
    closePanel();
  }
  openSendPanel();
}

// Bottom row buttons

function music() {
  var musicIndicator = document.getElementById('music-indicator');

  if (musicIndicator.classList.contains('active')) {
    stopBGMusic();
  } else {
    startBGMusic();
  }
  hideOptionsBarNoSound();
}

function print() {
  hideOptionsBarNoSound();
  setTimeout(function(){document.getElementById("mainFrame").contentWindow.print();},450);
}

function hangUp() {
  hideOptionsBarNoSound();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector(".reload").addEventListener("click", function(event) {
    reload(event);
  });
});

function reload(event) {
  var iframe = document.getElementById("mainFrame");
  if (event) {
    var isCtrlPressed = event.ctrlKey || event.metaKey;
    var isShiftPressed = event.shiftKey;

    if (isCtrlPressed || isShiftPressed) {
      console.log("Force reload requested!");
      iframe.contentWindow.location.reload(true);  // Cache-clearing reload
    } else {
      console.log("Normal reload requested.");
      iframe.contentWindow.location.reload();  // Standard reload
    }
  }

  hideOptionsBarNoSound();
}

function closePanel() {
  var panel = document.getElementById('panel');
  resetSelectionBox();
  setTimeout(function() {
    document.getElementById('panelSlide').play();
    document.getElementById('textQuery').style.display = 'unset';
    document.getElementById('textQuery').style.type = 'text';
    document.getElementById('bottom-message').style.bottom = '7vw';
    document.getElementById('panelClear').style.display = 'unset';
    document.getElementById('panelCancel').style.display = 'unset';
    document.getElementById('panelSubmit').style.top = '6.5vw';
    resetSelectionBox();
  },200);
  panel.classList.remove('show');
  panel.classList.remove('showing');
  panel.classList.add('hiding');
  setTimeout(function(){panel.classList.add('hide');},395);
}

function pip() {
  var pipIndicator = document.getElementById('pip-indicator');

  function enablePip() {
    showPipWindow();
    pipIndicator.classList.add('active');
  }

  function disablePip() {
    hidePipWindow();
    pipIndicator.classList.remove('active');
  }

  function showPipWindow() {
    
  }

  function hidePipWindow() {
    
  }

  if (pipIndicator.classList.contains('active')) {
    disablePip();
  } else {
    enablePip();
  }
  hideOptionsBarNoSound();
}

function clearMessage() {
  document.getElementById('bottom-message').textContent = '';
}

// <display> tag reimplementation

document.addEventListener('DOMContentLoaded', function () {
  var iframe = document.getElementById('mainFrame');
  if (!iframe) return;

  iframe.addEventListener('load', function () {
    var iframeDocument = iframe.contentDocument;
    if (!iframeDocument) return;
    var displayMeta = iframeDocument.querySelector('meta[name="display"]');
    var statusBar = document.querySelector('.status-bar');
    var optionsBar = document.getElementById('options-bar');

    if (displayMeta) {
      var displayOptions = displayMeta.getAttribute('content').split(' ');

      if (displayOptions.includes('noScroll')) {
        console.log('Scrolling disabled - noScroll is set in the display tag.');
        iframeDocument.body.style.overflow = 'hidden';
      }

      if (displayOptions.includes('noStatus')) {
        console.log('Status bar hidden - noStatus is set in the display tag.');
        statusBar.style.display = 'none';
        optionsBar.style.display = 'none';
        iframe.classList.add('noStatus');
      } else {
        statusBar.style.display = 'block';
        optionsBar.style.display = 'grid';
        iframe.classList.remove('noStatus');
      }

      if (displayOptions.includes('noMusic')) {
        console.log('Background music disabled - noMusic is set in display tag.');
        stopBGMusic();
        document.querySelector('.music').disabled = true;
      }
    } else {
      statusBar.style.display = 'block';
      optionsBar.style.display = 'grid';
      iframe.classList.remove('noStatus');
      document.querySelector('.music').disabled = false;
    }
  });
});


// Background music, baby!

document.addEventListener('DOMContentLoaded', function() {
  const bgMusic = document.getElementById('bgmusic');
  const musicList = [
    'audio/music/prealphaDialing.mp3',
    'audio/aoltv.mp3'
    // uh sorry we ran out of songs
  ];

  let currentSongIndex = 0;

  window.startBGMusic = function() {
    document.getElementById('music-indicator').classList.add('active');
    if (!bgMusic.src) {
      bgMusic.src = musicList[currentSongIndex];
    }
    bgMusic.currentTime = 0;
    bgMusic.play();
    bgMusic.addEventListener('ended', playNextSong);
  };

  window.stopBGMusic = function() {
    document.getElementById('music-indicator').classList.remove('active');
    fadeOutMusic();
  };

  function playNextSong() {
    bgMusic.removeEventListener('ended', playNextSong);
    currentSongIndex = (currentSongIndex + 1) % musicList.length;

    bgMusic.src = musicList[currentSongIndex];
    bgMusic.currentTime = 0;
    bgMusic.play();

    bgMusic.addEventListener('ended', playNextSong);
  }

  function fadeOutMusic() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const startTime = audioContext.currentTime;
    const fadeDuration = 0.5;

    bgMusic.volume = 1;
    bgMusic.volume = bgMusic.volume - 0.01;

    const fadeOutInterval = setInterval(function () {
      if (bgMusic.volume > 0) {
        bgMusic.volume = Math.max(0, bgMusic.volume - 0.01); 
      } else {
        clearInterval(fadeOutInterval);
        bgMusic.pause();
        bgMusic.currentTime = 0;
        bgMusic.volume = 1;
      }
    }, fadeDuration * 10);
  }
});

// Audioscope logic

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    var statusContainer = document.querySelector('.status-container');
    statusContainer.classList.remove('has-audioscope');
  }, 10);
});

function toggleAudioscope() {
  var statusContainer = document.querySelector('.status-container');
  if (statusContainer.classList.contains('has-audioscope')) {
    disableAudioscope();
  } else {
    enableAudioscope();
  }

  function enableAudioscope() {
    statusContainer.classList.add('has-audioscope');
  }

  function disableAudioscope() {
    statusContainer.classList.remove('has-audioscope');
  }
}

// styling workaround, no longer needed for now
/*
document.addEventListener('DOMContentLoaded', function() {
  var statusbarAudioscope = document.querySelector('.status-container webtv-audioscope');
  if (statusbarAudioscope && statusbarAudioscope.shadowRoot) {
    var canvas = statusbarAudioscope.shadowRoot.querySelector('canvas');
    if (canvas) {
      canvas.style.borderRadius = '0.4vw';
    }
  }
});
*/

// Backward navigational sound, doesn't currently work

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('mainFrame').addEventListener('popstate', function(event) {
    if (event.state && event.state.fromHistoryAPI) {
      var backSound = document.getElementById('backSound');
      backSound.currentTime = 0;
      backSound.play();
    }
  });
});

// Sidebar toggling logic

function toggleSidebarIframe() {
  var sidebar = document.getElementById('mainFrame').contentDocument.querySelector('.sidebar');
  var panelUp = document.getElementById('panelUp');
  var panelDown = document.getElementById('panelDown');
  function showSidebarIframe() {
    panelUp.currentTime = 0;
    panelUp.play();
    sidebar.classList.remove('hiding');
    sidebar.classList.remove('hide');
    sidebar.classList.add('show');
  }
  function hideSidebarIframe() {
    panelDown.currentTime = 0;
    panelDown.play();
    sidebar.classList.remove('showing');
    sidebar.classList.remove('show');
    sidebar.classList.add('hide');
  }
  if (sidebar.classList.contains('show')) {
    hideSidebarIframe();
  } else {
    showSidebarIframe();
  }
}

// Loading panel logic, unfinished

document.addEventListener('DOMContentLoaded', function() {
  var loadingPanel = document.getElementById('loadingPanel');
  var loadingMessage = document.getElementById('loadingMessage');
  var iframe = document.getElementById('mainFrame');

  function startLoading() {
    console.log('startLoading called!');
    loadingPanel.style.visibility = 'visible';
    loadingMessage.textContent = 'Getting page';
  }

  function stopLoading() {
    console.log('stopLoading called!');
    loadingPanel.style.visibility = 'hidden';
    loadingMessage.textContent = '';
  }

  function handleStateChange() {
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDocument.readyState === 'complete') {
      console.log('Finished loading.');
      stopLoading();
    } else {
      console.log('Loading new page.');
      startLoading();
    }
  }
  
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'loading') {
        const progress = event.data.progress;
        console.log(progress);
    }
  });

  iframe.addEventListener('load', handleStateChange);
  iframe.contentDocument.addEventListener('unload', handleStateChange);
});

// duplicates from main.js to prevent errors

// Link handler
function linkHandler(url) {
  setTimeout(function() {
    location.href = url;
  }, 235);
}

// Selection box
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
          updateSelectionBoxNoGreen();
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
    resetSelectionBox();
  }, 1);
}

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