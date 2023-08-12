document.addEventListener('DOMContentLoaded', function () {
  const inputSound = document.getElementById('inputSound');
  const inputs = document.querySelectorAll('.input');
  const clickSound = document.getElementById('clickSound');
  const clickableButtons = document.querySelectorAll('.clickable');
  const submitInputs = document.querySelectorAll('.submit');
  const submitSound = document.getElementById('submitSound');

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

  clickableButtons.forEach(button => {
    button.addEventListener('click', playClickSound);
  });

  inputs.forEach(button => {
    button.addEventListener('click', playInputSound);
  });

  submitInputs.forEach(button => {
    button.addEventListener('click', playSubmitSound);
  });

});