function adjustOverlayArea() {
  var todayContainer = document.querySelector('.webtv-today-container');
  var bottomLinks = document.querySelector('.bottom-links');
  var overlay = document.querySelector('.clickable-today-overlay');
  if (!todayContainer) { return; }
  var todayContainerWidth = todayContainer.offsetWidth;
  var todayContainerHeight = todayContainer.offsetHeight;
  var bottomLinksHeight = bottomLinks.offsetHeight;

  var dynamicWidth = (todayContainerWidth * 0.99) + 'px';
  var dynamicHeight = (todayContainerHeight - bottomLinksHeight) * 0.98 + 'px';

  var mobileDynamicWidth = todayContainerWidth * 0.99 + 'px';
  var mobileDynamicHeight = (todayContainerHeight - bottomLinksHeight) * 0.98 + 'px';

  if (window.matchMedia('(max-width: 760px)').matches) {
    overlay.style.width = mobileDynamicWidth;
    overlay.style.height = mobileDynamicHeight;
  } else {
    overlay.style.width = dynamicWidth;
    overlay.style.height = dynamicHeight;
  }
}

var resizeObserver = new ResizeObserver(adjustOverlayArea);
var todayContainer = document.querySelector('.webtv-today-container');
if (todayContainer) { resizeObserver.observe(todayContainer); }
window.addEventListener('load', adjustOverlayArea);
window.addEventListener('resize', adjustOverlayArea);