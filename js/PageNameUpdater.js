document.addEventListener('DOMContentLoaded', () => {
  const pageTitleElement = document.querySelector('.page-name');

  function updatePageName() {
    const pageTitle = document.title;
    pageTitleElement.textContent = pageTitle;
  }

  updatePageName();

  const observer = new MutationObserver(() => {
    updatePageName();
  });

  observer.observe(document.querySelector('title'), { subtree: true, characterData: true, childList: true });
});