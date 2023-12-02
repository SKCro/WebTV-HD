function adjustOverlayArea() {
  var todayContainer = document.querySelector('.webtv-today-container');
  var bottomLinks = document.querySelector('.bottom-links');
  var overlay = document.querySelector('.clickable-today-overlay');

  if (!todayContainer) {
    return;
  }

  var todayContainerWidth = todayContainer.offsetWidth;
  var todayContainerHeight = todayContainer.offsetHeight;
  var bottomLinksHeight = bottomLinks.offsetHeight;

  var dynamicWidth = (todayContainerWidth * 0.99) + 'px';
  var dynamicHeight = (todayContainerHeight - bottomLinksHeight) * 0.99 + 'px';

  var mobileDynamicWidth = todayContainerWidth * 0.98 + 'px';
  var mobileDynamicHeight = (todayContainerHeight - bottomLinksHeight - (bottomLinksHeight / 2)) + 'px';

  if (window.matchMedia('(max-width: 760px)').matches) {
    overlay.style.width = mobileDynamicWidth;
    overlay.style.height = mobileDynamicHeight;
  } else {
    overlay.style.width = dynamicWidth;
    overlay.style.height = dynamicHeight;
  }
}

var resizeObserver = new ResizeObserver(throttle(adjustOverlayArea, 100));
var todayContainer = document.querySelector('.webtv-today-container');
if (todayContainer) {
  resizeObserver.observe(todayContainer);
}

window.addEventListener('load', adjustOverlayArea);
window.addEventListener('resize', adjustOverlayArea);

function throttle(callback, limit) {
  var inThrottle;
  return function () {
    var args = arguments;
    var context = this;
    if (!inThrottle) {
      callback.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        inThrottle = false;
      }, limit);
    }
  };
}

// just for you, halen

function snortAsbestos() {
  document.getElementById('submitSound').play();
  var smoke = document.querySelector('.smoke');
  var currentAnimation = window.getComputedStyle(smoke).getPropertyValue('animation');
  smoke.style.animation = currentAnimation ? currentAnimation + ', fadeOut 250ms linear' : 'fadeOut 250ms linear';
  setTimeout(function() { smoke.style.opacity = 0; }, 250);
  window.open('https://www.youtube.com/watch?v=THc1X-kEX4E', '_new');
  linkHandler('https://skcro.github.io/WebTV-HD/Home.html');
}

function asbestos() {
  document.body.style.opacity = 0;
  setTimeout(function() {
    var headerContent = document.head.innerHTML;
    while (document.body.firstChild) { document.body.removeChild(document.body.firstChild); }
    document.body.style.opacity = 1;
    var newContent = document.createElement('div')
    newContent.innerHTML = String.raw `
      <audio id=1 src=https://skcro.github.io/WebTV-HD/audio/asbestos.mp3 preload=auto></audio>
      <audio id=errorSound src=https://skcro.github.io/WebTV-HD/audio/error.mp3 preload=auto></audio>
      <audio id=submitSound src=https://skcro.github.io/WebTV-HD/audio/submitClick.mp3 preload=auto></audio>
      <div id=selectionbox></div>
      <div class=smoke></div>
      <div class=dialog-overlay>
        <dialog id=webtv-dialog>
          <div class=dialog-message-container>
            <div class=dialog-logo></div>
            <div class=dialog-message>WebTV ran into a mesotheleoma problem. You may be entitled to financial compensation.</div>
          </div>
          <div class=dialog-separator><hr></div>
          <button class="dialog-button submit" onClick=closeDialog();snortAsbestos();>Continue</button>
        </dialog>
      </div>
    `;
    document.body.appendChild(newContent);
    document.head.innerHTML = headerContent;
    document.title = 'asbestos';
    var sound = document.getElementById('1');
    sound.play();
    var intervalId = setInterval(function() {
      if (sound.currentTime >= sound.duration - 2) {
        clearInterval(intervalId);
        openDialog();
      }
    },100);
  },500);
}
