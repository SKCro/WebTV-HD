let stopProgressUpdates = false;

function initDialing() {
  const progressBar = document.getElementById('progressbar');
  const progressMessage = document.getElementById('progressbar-message');
  let value = 10;

  const interval = setInterval(() => {
    if (stopProgressUpdates) {
      clearInterval(interval);
      return;
    }
    value += 10;
    progressBar.value = `${value}`;

    if (value === 90) {
      progressMessage.textContent = 'Connecting to WebTV';
      clearInterval(interval);
    } else if (value === 30) {
      progressMessage.textContent = 'Waiting to connect';
    }
  }, 2000);
}

function doSplash() { /* Not finished yet - this code will remove elements and display a splash screen, then redirect to the Home page
  const city = document.getElementById('city');
  const progressBar = document.getElementById('progressbar');
  const progressMessage = document.getElementById('progressbar-message');
  setTimeout("location.href='Home.html'",5000)  */
}

function skipDialing() {
  const dialingMusic = document.getElementById("dialing-music");
  const progressBar = document.getElementById('progressbar');
  const progressMessage = document.getElementById('progressbar-message');
  const button = document.getElementById('skipDialing');
  progressMessage.textContent = 'ultimatetv reference';
  progressBar.value = 100;
  stopProgressUpdates = true;
  dialingMusic.pause();
  dialingMusic.removeAttribute('controls');
  button.remove();
  doSplash();
}

function getDialingTheme() {
  const dialingMusic = document.getElementById("dialing-music");
  const a = Math.floor(Math.random() * 5) + 1;
  
  if (a === 1) {
  dialingMusic.src = "audio/aoltv.mp3";
  dialingMusic.load();
  }
}

window.addEventListener("load", initDialing);
window.addEventListener("load", getDialingTheme);