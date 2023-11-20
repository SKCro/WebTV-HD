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
      // If the iframe is loaded, update the page name
      updatePageName();
    } else {
      // If the iframe is not loaded yet, retry after a short delay
      setTimeout(waitForIframeLoad, 100);
    }
  }

  // Call the function to wait for the iframe load
  waitForIframeLoad();

  // Attach the updatePageName function to the load event of the iframe
  iframe.addEventListener('load', function () {
    updatePageName();
  });
});

// Options bar stuff

function showOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  var statusBar = document.querySelector('.status-bar.iframe');
  var panelUp = document.getElementById('panelUp');
  resetSelectionBox();
  panelUp.currentTime = 0;
  panelUp.play();
  optionsBar.classList.remove('hiding');
  optionsBar.classList.remove('hide');
  optionsBar.classList.add('show');
  statusBar.classList.remove('hiding');
  statusBar.classList.remove('hide');
  statusBar.classList.add('show');
  // make sure options bar sticks after animating
  setTimeout(function() {
    optionsBar.classList.add('showing');
    statusBar.classList.add('showing');
  }, 395);
}

function hideOptionsBar() {
  var optionsBar = document.getElementById('options-bar');
  var statusBar = document.querySelector('.status-bar.iframe');
  var panelUp = document.getElementById('panelUp');
  panelDown.currentTime = 0;
  panelDown.play();
  optionsBar.classList.remove('showing');
  optionsBar.classList.remove('show');
  optionsBar.classList.add('hide');
  statusBar.classList.remove('showing');
  statusBar.classList.remove('show');
  statusBar.classList.add('hide');
  // ditto
  setTimeout(function() {
    optionsBar.classList.add('hiding');
    statusBar.classList.add('hiding');
  }, 395);
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
    setTimeout(function() {
      optionsBar.classList.add('hiding');
      statusBar.classList.add('hiding');
    }, 395);
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

// Top row buttons

function home() {
  hideOptionsBarNoSound();
  document.getElementById("mainFrame").src = 'iframeTest2.html';
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
    if (destUrl !== 'http://' && destUrl !== 'https://' && destUrl !== 'file://*' && destUrl !== '') {
      iframe.src = destUrl;
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
    document.getElementById('panelSubmit').onclick = closeSavePanel;
    panel.classList.remove('hide');
    panel.classList.remove('hiding');
    panel.classList.add('showing');
    setTimeout(function(){panel.classList.add('show');document.getElementById('panelSlide').play();},395);
  }
  function closeSavePanel() {
    closePanel();
    setTimeout(function() {
      textInput.style.display = 'unset';
      document.getElementById('bottom-message').style.bottom = '7vw';
      document.getElementById('panelClear').style.display = 'unset';
      document.getElementById('panelCancel').style.display = 'unset';
    document.getElementById('panelSubmit').style.top = '6.5vw';
    },200);
  }
  openSavePanel();
}

function send() {
  hideOptionsBarNoSound();
  var iframe = document.getElementById('mainFrame');
  function openSendPanel() {
    var panel = document.getElementById('panel');
    var textInput = document.getElementById('textQuery');
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
    linkHandler('mailto:' + emailAddress.value + '?body=' + encodeURIComponent(iframe.src));
	closePanel();
  }
  openSendPanel();
}

// Bottom row buttons

function music() {
  var musicIndicator = document.getElementById('music-indicator');

  function enableMusic() {
    musicIndicator.classList.add('active');
    startBGMusic();
  }

  function disableMusic() {
    musicIndicator.classList.remove('active');
    stopBGMusic();
  }

  if (musicIndicator.classList.contains('active')) {
    disableMusic();
  } else {
    enableMusic();
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

function reload() {
  document.getElementById("mainFrame").contentWindow.location.reload();
  hideOptionsBarNoSound();
}

function closePanel() {
  var panel = document.getElementById('panel');
  document.getElementById('panelSlide').play();
  panel.classList.remove('show');
  panel.classList.remove('showing');
  panel.classList.add('hiding');
  setTimeout(function(){panel.classList.add('hide');resetSelectionBox();},395);
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
        document.body.style.overflow = 'hidden';
      }

      if (displayOptions.includes('noStatus')) {
        statusBar.style.display = 'none';
        optionsBar.style.display = 'none';
        iframe.style.height = '100vh';
      } else {
        statusBar.style.display = 'block';
        optionsBar.style.display = 'grid';
        iframe.style.height = 'calc(100vh - 4vw)';
      }

      if (displayOptions.includes('noMusic')) {
        console.log('Background music disabled - noMusic is set in display tag.');
        // Code to prevent background music goes here later
      }
    } else {
      statusBar.style.display = 'block';
      optionsBar.style.display = 'grid';
      iframe.style.height = 'calc(100vh - 4vw)';
    }
  });
});


// Background music, baby!

document.addEventListener('DOMContentLoaded', function() {
  const bgMusic = document.getElementById('bgmusic');
  const musicList = [
    '/audio/music/prealphaDialing.mp3',
    '/audio/aoltv.mp3'
    // uh sorry we ran out of songs
  ];

  let currentSongIndex = 0;

  window.startBGMusic = function() {
    if (!bgMusic.src) {
      bgMusic.src = musicList[currentSongIndex];
    }
    bgMusic.currentTime = 0;
    bgMusic.play();
    bgMusic.addEventListener('ended', playNextSong);
  };

  window.stopBGMusic = function() {
    bgMusic.pause();
  };

  function playNextSong() {
    bgMusic.removeEventListener('ended', playNextSong);
    currentSongIndex = (currentSongIndex + 1) % musicList.length;

    bgMusic.src = musicList[currentSongIndex];
    bgMusic.currentTime = 0;
    bgMusic.play();

    bgMusic.addEventListener('ended', playNextSong);
  }
});

// Backward navigational sound

window.addEventListener('popstate', function(event) {
  if (event.state && event.state.fromHistoryAPI) {
    navigateWithinIframe();
    var backSound = document.getElementById('backSound');
    backSound.currentTime = 0;
    backSound.play();
  }
});

// Sidebar toggling stuff, unfinished

function toggleSidebarIframe() {
  var sidebar = document.getElementById('mainFrame').document.querySelector('.sidebar');
  if (sidebar.classList.contains('show')) {
    hideSidebar();
  } else {
    showSidebar();
  }
}