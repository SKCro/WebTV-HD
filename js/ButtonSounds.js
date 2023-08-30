document.addEventListener('DOMContentLoaded', function () {
  var inputSound = document.getElementById('inputSound');
  var inputs = document.querySelectorAll('.input');
  var clickSound = document.getElementById('clickSound');
  var clickableButtons = document.querySelectorAll('.clickable');
  var submitInputs = document.querySelectorAll('.submit');
  var submitSound = document.getElementById('submitSound');

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

  // Loop through clickableButtons and attach event listeners
  for (var i = 0; i < clickableButtons.length; i++) {
    clickableButtons[i].addEventListener('click', playClickSound);
  }

  // Loop through inputs and attach event listeners
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].addEventListener('click', playInputSound);
  }

  // Loop through submitInputs and attach event listeners
  for (var k = 0; k < submitInputs.length; k++) {
    submitInputs[k].addEventListener('click', playSubmitSound);
  }

});