let stopProgressUpdates = false;

function wait(ms) {
  return new Promise(function(resolve) {setTimeout(resolve, ms);});
}

function getDialingTheme(){
  var dialingMusic = document.getElementById("dialing-music");
  var a = Math.floor(Math.random() * 10) + 1;
  if (a === 1) {
    dialingMusic.src = "audio/music/other/aoltv.mp3";
    dialingMusic.load();
  }
}
window.addEventListener("load", getDialingTheme);

async function doSplash(withInterval) {
  var hiddenUntilConnected = document.querySelector(".hiddenUntilConnected");
  var hiddenUntilLogo = document.querySelector(".hiddenUntilLogo");
  var dialingMusic = document.getElementById("dialing-music");
  var splashJingle = document.getElementById("splash-jingle");
  setTimeout(function(){
    dialingMusic.pause();
    splashJingle.play();
    hiddenUntilLogo.classList.add('animation', 'cityCrossfade');
    setTimeout(function(){hiddenUntilLogo.remove();},450);
    hiddenUntilConnected.style.display = "flex";
    hiddenUntilConnected.classList.add("fadeIn");
    document.title = "WebTV Service";
    setTimeout(function(){location.href = "Home.html"},(splashJingle.duration * 1000));
  },withInterval);
}

async function powerOn(){
  document.querySelector(".hideOnClick").remove();
  document.querySelector(".logoArea").classList.add("noCursor"); // Disable cursor only whilst logo appears
  await wait(800);
  document.getElementById("modem").play();
  var img = document.querySelector(".hiddenUntilClick");
  img.classList.remove("hiddenUntilClick");
  img.classList.add("animating");

  var imgAnimating = document.querySelector(".animating");
  imgAnimating.style.animationPlayState = "running";

  await wait(3000); // Wait for logo to finish
  initDialing(); // Show dialing elements
}

function initDialing(){
  var hiddenUntilLogo = document.querySelector(".hiddenUntilLogo");
  var logoArea = document.querySelector(".logoArea");
  var dialingMusic = document.getElementById("dialing-music");
  var progressBar = document.getElementById('progressbar');
  var progressMessage = document.getElementById('progressbar-message');

  // Options relative to page appearance and functionality
  logoArea.remove();
  hiddenUntilLogo.classList.add("fadeIn"); // Make sure we fade in the newly given page
  hiddenUntilLogo.style.display = "block";
  dialingMusic.play();
  document.title = "Connecting to WebTV";

  let value = 10;

  var interval = setInterval(function(){
    if (stopProgressUpdates) {
      clearInterval(interval);
      return;
    }
    value += 10;
    /*  Progress bar messages. For first message, see Dialing.html
        When setting these messages, set an interval value for when they should occur.
        Progress bar values are defined from 0 to 100, counting by tens.
        The example provided mimmics a box with a Tellyscript. */
    var progressBarMessages = [
      { message: "Dialing WebTV", interval: 20, value: 11 },
      { message: "Waiting for answer", interval: 40, value: 43 },
      { message: "WebTV answering", interval: 100, value: 60 },
      { message: "Connecting", interval: 120, value: 90 },
      { message: "Connecting to WebTV", interval: 140, value: 100 }
    ];
    progressBarMessages.forEach((details) => {
      if (value == details.interval) {
        progressBar.value = details.value;
        progressMessage.textContent = details.message;
        if (details.value >= 100) doSplash(5000);
      }
    });
  }, 2000);
}

function skipDialing(){
  stopProgressUpdates = true;
  document.getElementById('progressbar-message').textContent = 'ultimatetv reference';
  document.getElementById('progressbar').value = 100;
  document.getElementById('dialing-music').pause();
  document.getElementById('skipDialing').remove();
  doSplash();
}

document.addEventListener('DOMContentLoaded', function(){
  focus(document.getElementById('skipDialing'));
});