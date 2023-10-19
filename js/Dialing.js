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

    /*  Progress bar messages. For first message, see Dialing.html
        When setting these messages, set an interval value for when they should occur.
        You can also control the progress bar value if it needs to be something other than the interval.
        The example provided mimmics a box with a Tellyscript. */

    const progressBarMessages = [
      { message: "Dialing 911", interval: 20, value: 11 },
      { message: "Waiting for answer", interval: 50, value: 43 },
      { message: "WebTV answering", interval: 70, value: 60 },
      { message: "Connecting", interval: 80 },
      { message: "Connecting to WebTV", interval: 110, value: 100 }
    ];

    progressBarMessages.forEach((details, index) => {
      if (value == details.interval) {
        if (details.interval >= 100) doSplash(5000);
        if (!details.value) progressBar.value = details.interval; //Allows us to use the interval as a progress value if it fits
        else progressBar.value = details.value;
        progressMessage.textContent = details.message;
      }
    });
  }, 2000);
}

function doSplash(withInterval) { /* TODO: This code will remove elements and display a splash screen, then redirect to the Home page
  const city = document.getElementById('city');
  const progressBar = document.getElementById('progressbar');
  const progressMessage = document.getElementById('progressbar-message'); */
  setTimeout(() => { location.href = "Home.html" }, withInterval); //TODO: Splash page
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
  doSplash(1000);
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