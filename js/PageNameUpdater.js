document.addEventListener('DOMContentLoaded', () => {
  const pageTitleElement = document.querySelector('.page-name');
  const pageTitle = document.title;
  pageTitleElement.textContent = pageTitle;
});