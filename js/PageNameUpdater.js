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