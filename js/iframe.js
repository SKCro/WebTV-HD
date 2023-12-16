// Variables - defining them @ window-level to prevent errors
document.addEventListener('DOMContentLoaded', function(){
  window.iframe = document.getElementById('mainFrame');
  window.statusBar = document.querySelector('.status-bar.iframe');
  window.statusContainer = document.querySelector('.status-container');
  window.optionsBar = document.getElementById('options-bar');
  window.panel = document.getElementById('panel');
  window.panelUp = document.getElementById('panelUp');
  window.panelDown = document.getElementById('panelDown');
  window.panelSlide = document.getElementById('panelSlide');
  window.textInput = document.getElementById('textQuery');
  window.panelClear = document.getElementById('panelClear');
  window.panelCancel = document.getElementById('panelCancel');
  window.panelSubmit = document.getElementById('panelSubmit');
  window.bottomMessage = document.getElementById('bottomMessage');
  window.pretext = document.getElementById('top-input-pretext');
});

// Page name updater
document.addEventListener('DOMContentLoaded', function(){
  var parentTitle = document.querySelector('.page-name');
  function handleMessage(event) {
    if (event.data && event.data.title) {
      var iframeTitle = event.data.title;
      parentTitle.textContent = iframeTitle;
      document.title = iframeTitle;
    }
  }
  window.addEventListener('message', handleMessage);
});

// Options bar stuff
function showOptionsBar(){
  if (panel.classList.contains('showing')) {closePanel();}
  resetSelectionBox();
  try {resetSelectionBoxIframe();} catch(error){}
  panelUp.currentTime = 0;
  panelUp.play();
  optionsBar.classList.remove('hiding', 'hide');
  optionsBar.classList.add('show');
  statusBar.classList.remove('hiding', 'hide');
  statusBar.classList.add('show');
  document.querySelectorAll('.options-button').forEach(function(button){button.classList.remove('noselect');});
  document.querySelector('.options-logo').classList.remove('noselect');
}

function hideOptionsBar(){
  resetSelectionBox();
  panelDown.currentTime = 0;
  panelDown.play();
  optionsBar.classList.remove('showing', 'show');
  optionsBar.classList.add('hide');
  statusBar.classList.remove('showing', 'show');
  statusBar.classList.add('hide');
  document.querySelectorAll('.options-button').forEach(function(button){button.classList.add('noselect');});
  document.querySelector('.options-logo').classList.add('noselect');
}

function hideOptionsBarNoSound(){
  setTimeout(function(){
    resetSelectionBox();
    optionsBar.classList.remove('showing', 'show');
    optionsBar.classList.add('hide');
    statusBar.classList.remove('showing', 'show');
    statusBar.classList.add('hide');
    document.querySelectorAll('.options-button').forEach(function(button){button.classList.add('noselect');});
    document.querySelector('.options-logo').classList.add('noselect');
  },20);
}

function toggleOptionsBar(){
  if (optionsBar.classList.contains('show')){hideOptionsBar();} else {showOptionsBar();}
}

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 46) {toggleOptionsBar();}
});

function removeNoSelects(){
  textInput.classList.remove('noselect');
  panelSubmit.classList.remove('noselect');
  panelClear.classList.remove('noselect');
  panelCancel.classList.remove('noselect');
}

// Top row buttons
function home(){
  hideOptionsBarNoSound();
  iframe.src = 'Home.html';
}

function find(){
  hideOptionsBarNoSound();
  function openFindPanel(){
    removeNoSelects();
    pretext.textContent = 'Find word';
    pretext.style.color = 'var(--webtv-yellow)';
    bottomMessage.textContent = '';
    textInput.value = '';
    textInput.placeholder = '';
    panelSubmit.textContent = 'Find on Page';
    panelSubmit.onclick = findInIframe;
    panelClear.onclick = clearFindBox;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');panelSlide.play();},395);
  }
  function clearFindBox(){textInput.value = '';}
  function findInIframe(){
    if (iframe && iframe.contentWindow) {
      var searchTerm = textInput.value.toLowerCase();
      var isFound = iframe.contentWindow.find(searchTerm);
      if (isFound) {closePanel();} else {errorSound.currentTime = 0;errorSound.play();bottomMessage.textContent = 'Could not find the word on this page.';}
    } else {console.error('Attempted to find something inside the iframe before it has loaded.');}
  }
  openFindPanel();
}

function info(){
  hideOptionsBarNoSound();
  pretext.textContent = '';
  bottomMessage.textContent = document.title;
  bottomMessage.style.bottom = '18.5vw';
  panelCancel.style.display = 'none';
  panelClear.style.display = 'none';
  textInput.value = '';
  textInput.placeholder = '';
  textInput.style.display = 'none';
  panelSubmit.style.top = 'unset';
  panel.classList.remove('hide');
  panel.classList.remove('hiding');
  panel.classList.add('showing');
  panelClear.classList.add('noselect');
  panelCancel.classList.add('noselect');
  panelSubmit.classList.add('noselect');
  setTimeout(function(){panel.classList.add('show');panelSlide.play();highlight(document.getElementById('panelSubmit'));},395);
}

function goTo(){
  hideOptionsBarNoSound();
  function openGoToPanel(){
    removeNoSelects();
    pretext.textContent = 'Address';
    pretext.style.color = 'var(--webtv-yellow)';
    bottomMessage.textContent = '';
    textInput.classList.remove('noselect');
    textInput.type = 'url';
    textInput.value = 'http://';
    textInput.placeholder = '';
    panelSubmit.textContent = 'Go to Page';
    panelSubmit.onclick = goToURL;
    panelClear.onclick = clearURL;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');panelSlide.play();},395);
  }
  function goToURL(event) {
    event.preventDefault();
    var destUrl = document.getElementById('textQuery').value;
    if (destUrl === 'barrelroll' || destUrl === 'barrel roll' || destUrl === 'do a barrel roll' || destUrl === 'doabarrelroll') {
      closePanel();
      doBarrelRoll();
    } else if (destUrl !== 'http://' && destUrl !== 'https://' && destUrl !== '') {
      iframe.src = destUrl;
      closePanel();
    } else {
      document.getElementById('bottom-message').textContent = 'Type the address of a webpage.';
      var errorSound = document.getElementById('errorSound');
      errorSound.currentTime = 0;
      errorSound.play(); 
    }
  }
  function clearURL(){
    event.preventDefault();
    document.getElementById('textQuery').value = 'http://';
  }
  openGoToPanel();
}

function save(){
  hideOptionsBarNoSound();
  pretext.textContent = '';
  bottomMessage.textContent = 'To save this page, press Ctrl+D on your keyboard.';
  bottomMessage.style.bottom = '18.5vw';
  panelCancel.style.display = 'none';
  panelClear.style.display = 'none';
  textInput.value = '';
  textInput.placeholder = '';
  textInput.style.display = 'none';
  panelSubmit.style.top = 'unset';
  panelSubmit.textContent = 'Continue';
  panelSubmit.onclick = closePanel;
  panel.classList.remove('hide');
  panel.classList.remove('hiding');
  panel.classList.add('showing');
  panelClear.classList.add('noselect');
  panelCancel.classList.add('noselect');
  panelSubmit.classList.remove('noselect');
  setTimeout(function(){panel.classList.add('show');panelSlide.play();highlight(document.getElementById('panelSubmit'));},395);
}

function send(){
  hideOptionsBarNoSound();
  function openSendPanel(){
    removeNoSelects();
    pretext.textContent = 'To:';
    pretext.style.color = 'var(--webtv-link)';
    bottomMessage.textContent = 'Send "' + document.title + '" by electronic mail.';
    textInput.value = '';
    panelSubmit.textContent = 'Send Page';
    panelSubmit.onclick = doSend;
    panelClear.onclick = clearEmail;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');panelSlide.play();},395);
  }
  function clearEmail(){
    event.preventDefault();
    document.getElementById('textQuery').value = '';
  }
  function doSend(){
    window.open('mailto:' + textInput.value + '?body=' + encodeURIComponent(iframe.src), '_blank');
    closePanel();
  }
  openSendPanel();
}

// Bottom row buttons
function music(){
  var musicIndicator = document.getElementById('musicIndicator');
  if (musicIndicator.classList.contains('active')) {stopBGMusic();} else {startBGMusic();}
  hideOptionsBarNoSound();
}

function print(){
  hideOptionsBarNoSound();
  setTimeout(function(){iframe.contentWindow.print();},450);
}

function hangUp(){
  hideOptionsBarNoSound();
  resetSelectionBox();
  stopBGMusic();
  document.getElementById('reconnectPanel').style.display = 'flex';
  document.getElementById('reconnectButton').classList.remove('noselect');
  document.querySelector('.status-container').classList.add('disconnected');
  setTimeout(function(){highlight(document.getElementById('reconnectButton'));},50);
}

document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.reload').addEventListener('click', function(event){reload(event);});
});

function reload(event) {
  if(event) {
    var isCtrlPressed = event.ctrlKey || event.metaKey;
    var isShiftPressed = event.shiftKey;
    if(isCtrlPressed || isShiftPressed) {
      console.log('Force reload requested!');
      iframe.contentWindow.location.reload(true); // Cache-clearing reload
    }else{
      console.log('Normal reload requested.');
      iframe.contentWindow.location.reload(); // Standard reload
    }
  }
  hideOptionsBarNoSound();
}

function pip(){
  var pipIndicator = document.getElementById('pipIndicator');
  var pipWindow = document.getElementById('pipWindow');
  var pipVideo = document.getElementById('pipVideo');
  function showPipWindow(){
    pipIndicator.classList.add('active');
    pipWindow.style.display = 'block';
    setTimeout(function(){pipWindow.classList.remove('hide');pipWindow.classList.remove('hidden');pipWindow.classList.add('show');},500);
    stopBGMusic();
    hideOptionsBarNoSound();
    pipVideo.src = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1';
    setTimeout(function(){pipVideo.style.visibility = 'visible';},1500);
  }
  function hidePipWindow(){
    pipIndicator.classList.remove('active');
    setTimeout(function(){pipWindow.classList.remove('show');pipWindow.classList.add('hide');pipWindow.classList.add('hide');},500);
    checkBGMusicStatus();
    hideOptionsBarNoSound();
    pipVideo.src = '';
    pipVideo.style.visibility = 'hidden';
  }
  if (pipIndicator.classList.contains('active')){hidePipWindow();}else{showPipWindow();}
}

function closePanel(){
  setTimeout(function(){
    panelSlide.play();
    textInput.style.display = 'unset';
    textInput.style.type = 'text';
    textInput.classList.add('noselect');
    bottomMessage.style.bottom = '7vw';
    panelClear.style.display = 'unset';
    panelClear.classList.add('noselect');
    panelCancel.style.display = 'unset';
    panelCancel.classList.add('noselect');
    panelSubmit.style.top = '6.5vw';
    panelSubmit.style.display = 'unset';
    panelSubmit.classList.add('noselect');
    resetSelectionBox();
  },200);
  panel.classList.remove('show', 'showing');
  panel.classList.add('hiding');
}

function clearMessage(){
  bottomMessage.textContent = '';
}

// <display> tag reimplementation
document.addEventListener('DOMContentLoaded', function(){
  iframe.addEventListener('load', function(){
    var iframeDocument = iframe.contentDocument;
    if (!iframeDocument) return;
    var displayMeta = iframeDocument.querySelector('meta[name="display"]');
    if (displayMeta) {
      var displayOptions = displayMeta.getAttribute('content').split(' ');
      if (displayOptions.includes('noScroll')){
        console.log('Scrolling disabled - noScroll is set in the display tag.');
        iframeDocument.body.style.overflow = 'hidden';
      }
      if (displayOptions.includes('noStatus')){
        console.log('Status bar hidden - noStatus is set in the display tag.');
        statusBar.style.display = 'none';
        optionsBar.style.display = 'none';
        iframe.classList.add('noStatus');
      } else {
        statusBar.style.display = 'block';
        optionsBar.style.display = 'grid';
        iframe.classList.remove('noStatus');
      }
      if (displayOptions.includes('noMusic')){
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
document.addEventListener('DOMContentLoaded', function(){
  var bgMusic = document.getElementById('bgmusic');
  var musicList = [
    'audio/music/ambient/sunlane.mp3',
    'audio/music/classical/minuet.mp3',
    'audio/music/keyboards/catacombs.mp3',
    'audio/music/keyboards/home_wtv.mp3',
    'audio/music/upbeat/jetset.mp3',
    'audio/music/ROMCache/prealphaDialing.mp3',
    'audio/music/other/aoltv.mp3',
    'audio/music/other/joeb.mp3'
  ];
  let shuffledMusicList = [...musicList];
  let currentSongIndex = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  window.startBGMusicWithDelay = function(ms){setTimeout(startBGMusic,ms);}

  window.startBGMusic = function(){
    document.getElementById('musicIndicator').classList.add('active');
    shuffle(shuffledMusicList);
    if (!bgMusic.src) {
      bgMusic.src = shuffledMusicList[currentSongIndex];
    }
    bgMusic.currentTime = 0;
    bgMusic.play();
    bgMusic.addEventListener('ended',playNextSong);
    showAudioscope();
  };

  window.stopBGMusic = function(){
    document.getElementById('musicIndicator').classList.remove('active');
    fadeOutMusic();
    setTimeout(function(){pickNextSong();hideAudioscope();},500);
  };

  function playNextSong(){
    bgMusic.removeEventListener('ended',playNextSong);
    currentSongIndex = (currentSongIndex + 1) % shuffledMusicList.length;
    bgMusic.src = shuffledMusicList[currentSongIndex];
    bgMusic.currentTime = 0;
    bgMusic.play();
    bgMusic.addEventListener('ended',playNextSong);
  }

  function pickNextSong(){
    bgMusic.removeEventListener('ended',playNextSong);
    currentSongIndex = (currentSongIndex + 1) % shuffledMusicList.length;
    bgMusic.src = shuffledMusicList[currentSongIndex];
    bgMusic.currentTime = 0;
    bgMusic.addEventListener('ended',playNextSong);
  }

  function fadeOutMusic(){
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var startTime = audioContext.currentTime;
    var fadeDuration = 0.5;
    bgMusic.volume = bgMusic.volume - 0.01;
    var fadeOutInterval = setInterval(function(){
      if(bgMusic.volume > 0) {
        bgMusic.volume = Math.max(0, bgMusic.volume - 0.01); 
      }else{
        clearInterval(fadeOutInterval);
        pickNextSong();
        bgMusic.volume = 1;
      }
    },fadeDuration * 10);
  }
});

function checkBGMusicStatus(){
  try{
    var displayTag = iframe.contentDocument.querySelector('meta[name="display"]');
    if(!displayTag){startBGMusicWithDelay(1500);}
    var displayOptions = displayTag.getAttribute('content').split(' ');
    if(displayOptions.includes('noMusic')){return;}else{startBGMusicWithDelay(1500);}
  }catch(error){console.log('Page doesn\'t have display tag, assuming BG music is allowed. Error: ',error);}
}

// Audioscope logic
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){
    document.querySelector('.status-container').classList.remove('has-audioscope');
  }, 10);
});

function toggleAudioscope(){
  if (statusContainer.classList.contains('has-audioscope')){hideAudioscope();}else{showAudioscope();}
}

function showAudioscope(){
  statusContainer.classList.add('has-audioscope');
}

function hideAudioscope(){
  statusContainer.classList.remove('has-audioscope');
}

// Styling workaround, no longer needed for now
/*
document.addEventListener('DOMContentLoaded', function(){
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
document.addEventListener('DOMContentLoaded', function(){
  iframe.addEventListener('popstate', function(event) {
    if (event.state) {
      var backSound = document.getElementById('backSound');
      backSound.currentTime = 0;
      backSound.play();
    }
  });
});

// Sidebar toggling logic
function toggleSidebarIframe(){
  var sidebar = iframe.contentDocument.querySelector('.sidebar');
  function showSidebarIframe(){
    panelUp.currentTime = 0;
    panelUp.play();
    sidebar.classList.remove('hiding');
    sidebar.classList.remove('hide');
    sidebar.classList.add('show');
    resetSelectionBox();
    resetSelectionBoxIframe();
  }
  function hideSidebarIframe(){
    panelDown.currentTime = 0;
    panelDown.play();
    sidebar.classList.remove('showing');
    sidebar.classList.remove('show');
    sidebar.classList.add('hide');
    resetSelectionBox();
    resetSelectionBoxIframe();
  }
  if (sidebar.classList.contains('show')) {hideSidebarIframe();} else {showSidebarIframe();}
}

// Loading panel logic
document.addEventListener('DOMContentLoaded', function(){
  var loadingPanel = document.getElementById('loadingPanel');
  var loadingMessage = document.getElementById('loadingMessage');
  window.startLoading = function startLoading(){
    console.log('startLoading called, showing loading indicator');
    loadingPanel.style.visibility = 'visible';
    loadingMessage.textContent = 'Contacting service';
    function getIframeTitle(){
      var iframeTitle = iframe.contentDocument.title;
      if(iframeTitle){
        loadingMessage.textContent = iframeTitle;
      } else{setTimeout(getIframeTitle,50);}
    }
    getIframeTitle();
  }
  window.stopLoading = function(){
    console.log('stopLoading called, hiding loading indicator');
    loadingPanel.style.visibility = 'hidden';
    loadingMessage.textContent = '';
    iframe.focus();
  }
  window.addEventListener('message', function(event){
    if(event.data && event.data.type === 'loading'){startLoading();}
  });
  iframe.addEventListener('load', stopLoading);
});

// Reconnect panel logic
function reconnect(){
  var modem = document.getElementById('modem');
  modem.currentTime = 0;
  modem.play();
  resetSelectionBox();
  document.getElementById('reconnectPanel').style.display = 'none';
  document.getElementById('reconnectButton').classList.add('noselect');
  document.querySelector('.status-container').classList.remove('disconnected');
  checkBGMusicStatus();
}

// Ensure that the button style loads during init
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){document.getElementById('reconnectPanel').style.display = 'none';},5);
});

// Dialog/showAlert logic
document.addEventListener('DOMContentLoaded', function(){
  window.dialog = document.getElementById('dialog');
  window.dialogLogo = document.querySelector('dialog-logo');
  window.dialogMessage = document.getElementById('dialogMessage');
  window.dialogButton = document.getElementById('dialogButton');
  window.errorSound = document.getElementById('errorSound');
  let intervalId;
  window.doAlert = function(text){
    var taunt = ['nice try lmfao', 'inspect element ain\'t gonna work here kid'];
    dialogMessage.textContent = text;
    openDialog();
    function checkDialogState(){
      if (dialogMessage.textContent !== text && !taunt.includes(dialogMessage.textContent) && dialogMessage.textContent !== '') {
        dialogMessage.textContent = taunt[Math.floor(Math.random() * taunt.length)];
        console.error('nice try fucker');
        setTimeout(function(){dialogMessage.textContent = text;},150);
      }
    }
    intervalId = setInterval(checkDialogState,10);
    window.resetDialogChecker = function(){
      clearInterval(intervalId);
      dialogMessage.textContent = text;
    };
  };
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'text') {doAlert(event.data.text);}
  });
});

function openDialog(){
  resetSelectionBoxIframe();
  setTimeout(function(){
    errorSound.currentTime = 0;
    errorSound.play();
    dialog.classList.remove('hidden');
    dialog.classList.add('shown');
    dialogButton.classList.remove('noselect');
    resetSelectionBox();
    highlight(dialogButton);
  },2);
}

function closeDialog(){
  resetDialogChecker();
  setTimeout(function(){
    dialog.classList.remove('shown');
    dialog.classList.add('hidden');
    dialogButton.classList.add('noselect');
    dialogMessage.textContent = '';
    resetSelectionBox();
    iframe.focus();
  },2);
}

// TV world stuff, unfinished

/* var tvIframe = document.getElementById('tvFrame'); */

// "barrelroll" easter egg
function doBarrelRoll(){
  var viewSound = document.getElementById('viewSound');
  setTimeout(function(){
    viewSound.currentTime = 0;
    viewSound.play();
    setTimeout(function(){
      document.body.style.perspective = '100vw';
      iframe.style.animation = 'flip 0.5s linear forwards';
      setTimeout(function(){
        iframe.style.animation = '0.5s flip 5s linear forwards reverse';
        iframe.offsetHeight;
        setTimeout(function(){
          iframe.style.animation = '';
          iframe.offsetHeight;
          document.body.style.perspective = 'none';
        },500);
      },5000);
    },1000);
  },800);
}

// Modified functions from main.js

// Link handler
function linkHandler(url) {
  setTimeout(function(){location.href = url;},235);
}

// Selection box
document.addEventListener('DOMContentLoaded', function(){
  var selectionBox = document.getElementById('selectionbox');
  var selectedElement = null;
  window.highlight = function(element){
    selectedElement = element;
    element.focus({preventScroll: true});
    updateSelectionBoxNoGreen();
  }
  window.resetSelectionBox = function(){
    selectedElement = null;
    updateSelectionBoxNoGreen();
  }
  function updateSelectionBox(){
    if (selectedElement){
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
        setTimeout(function(){selectionBox.classList.remove('green');},100);
      }
    } else {selectionBox.style.display = 'none';}
  }
  function updateSelectionBoxNoGreen(){
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
    } else {selectionBox.style.display = 'none';}
  }
  function updateSelectionBoxScroll(){ // going to try to use this to fix the scrolling issue
    if (selectedElement){
      var elementRect = selectedElement.getBoundingClientRect();
      var boxMargin = 4;
      var left = elementRect.left - boxMargin;
      var width = elementRect.width + 2 * boxMargin;
      var height = elementRect.height + 2 * boxMargin;
      selectionBox.style.left = left + 'px';
      selectionBox.style.width = width + 'px';
      selectionBox.style.height = height + 'px';
      selectionBox.style.display = 'block';
    } else {selectionBox.style.display = 'none';}
  }
  function checkIfInteractive(element){
    return (
      (element.classList.contains('clickable') || element.classList.contains('submit')) && !element.classList.contains('noselect')
      || (element.tagName === 'INPUT' && !element.classList.contains('noselect'))
    );
  }
  function getInteractiveElements(){
    var allElements = document.querySelectorAll('*');
    var interactiveElements = [];
    for (var i = 0; i < allElements.length; i++) {
      if (checkIfInteractive(allElements[i])) {interactiveElements.push(allElements[i]);}
    }
    return interactiveElements;
  }
  // Function to find the nearest interactive element to a given position
  function findNearestInteractiveElement(x, y) {
    var interactiveElements = getInteractiveElements();
    var nearestElement = null;
    var minDistance = Number.MAX_SAFE_INTEGER;
    for (var i = 0; i < interactiveElements.length; i++){
      var element = interactiveElements[i];
      var rect = element.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      if (distance < minDistance){
        minDistance = distance;
        nearestElement = element;
      }
    }
    return nearestElement;
  }
  // Event listener to update the selection box for various events
  window.addEventListener('load', resetSelectionBox);
  window.addEventListener('resize', updateSelectionBoxNoGreen);
  window.addEventListener('scroll', updateSelectionBoxScroll);
  document.addEventListener('click', function(event){
    var clickedElement = event.target;
    if (checkIfInteractive(clickedElement) && clickedElement !== selectedElement) {
      selectedElement = clickedElement;
      updateSelectionBox();
    } else {updateSelectionBoxNoGreen();}
  });
  document.addEventListener('keydown', function(event){
    if (event.key === 'Tab') {
      event.preventDefault();
      var interactiveElements = getInteractiveElements();
      var index = interactiveElements.indexOf(selectedElement);
      if (event.shiftKey) {
        selectedElement = interactiveElements[(index - 1 + interactiveElements.length) % interactiveElements.length];
      } else {selectedElement = interactiveElements[(index + 1) % interactiveElements.length];}
      updateSelectionBoxNoGreen();
    } else if (event.key === 'Enter') {
      if (selectedElement) {
        if (selectedElement.tagName === 'INPUT' && selectedElement.type === 'text' || selectedElement.type === 'url' || selectedElement.type === 'email') {
          updateSelectionBoxNoGreen();selectedElement.click();selectedElement.focus({preventScroll: true });
        } else {updateSelectionBox();selectedElement.click();}
      }
    }
  });
});

function resetSelectionBoxIframe(){
  iframe.contentWindow.resetSelectionBox();
}

// Button sounds
document.addEventListener('DOMContentLoaded', function(){
  var inputs = document.querySelectorAll('.input');
  var submitInputs = document.querySelectorAll('.submit');
  var clickableButtons = document.querySelectorAll('.clickable');
  var inputSound = document.getElementById('inputSound');
  var clickSound = document.getElementById('clickSound');
  var submitSound = document.getElementById('submitSound');
  var inputNoSound = document.querySelectorAll('.inputNoSound');
  function playClickSound(){clickSound.currentTime = 0; clickSound.play();}
  function playInputSound(){inputSound.currentTime = 0; inputSound.play();}
  function playSubmitSound(){submitSound.currentTime = 0; submitSound.play();}
  function preventSound(){inputSound.pause();}
  for (var i = 0; i < clickableButtons.length; i++) {clickableButtons[i].addEventListener('click', playClickSound);}
  for (var j = 0; j < inputs.length; j++) {inputs[j].addEventListener('click', playInputSound);}
  for (var k = 0; k < submitInputs.length; k++) {submitInputs[k].addEventListener('click', playSubmitSound);}
  for (var l = 0; l < inputNoSound.length; l++) {inputNoSound[l].addEventListener('click', preventSound);}
});