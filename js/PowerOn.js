let stopProgressUpdates = false;


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function doSplash(withInterval) {
    const hiddenUntilConnected = document.querySelector(".hiddenUntilConnected");
    const hiddenUntilLogo = document.querySelector(".hiddenUntilLogo");
    const dialingMusic = document.getElementById("dialing-music");
    const splashJingle = document.getElementById("splash-jingle");

    setTimeout(() => {
        dialingMusic.pause();
        splashJingle.play();

        hiddenUntilLogo.remove();
        hiddenUntilConnected.style.display = "flex";
        hiddenUntilConnected.classList.add("fadeIn");

        setTimeout(() => { location.href = "Home.html" }, (splashJingle.duration * 1000));
    }, withInterval);
}

async function powerOn() {
    const hideOnClick = document.querySelector(".hideOnClick");
    const logoArea = document.querySelector(".logoArea");
    hideOnClick.remove();
    logoArea.classList.add("noCursor"); // Disable cursor only whilst logo appears

    const modem = document.getElementById("modem");
    modem.play();

    const img = document.querySelector(".hiddenUntilClick");
    img.classList.remove("hiddenUntilClick");
    img.classList.add("animating");

    const imgAnimating = document.querySelector(".animating");
    imgAnimating.style.animationPlayState = "running";

    await wait(4000); // Wait for logo to finish
    initDialing(); // Show dialing elements
}

function initDialing() {
    const hiddenUntilLogo = document.querySelector(".hiddenUntilLogo");
    const logoArea = document.querySelector(".logoArea");
    const dialingMusic = document.getElementById("dialing-music");
    const progressBar = document.getElementById('progressbar');
    const progressMessage = document.getElementById('progressbar-message');

    // Options relative to page appearance and functionality
    logoArea.remove();
    hiddenUntilLogo.classList.add("fadeIn"); // Make sure we fade in the newly given page
    hiddenUntilLogo.style.display = "block";
    dialingMusic.play();
    document.title = "Connecting";

    let value = 10;

    const interval = setInterval(() => {
        if (stopProgressUpdates) {
            clearInterval(interval);
            return;
        }
        value += 10;

        /*  Progress bar messages. For first message, see Dialing.html
            When setting these messages, set an interval value for when they should occur.
            Progress bar values are defined from 0 to 100, counting by tens.
            The example provided mimmics a box with a Tellyscript. */

        const progressBarMessages = [
            { message: "Dialing 911", interval: 20, value: 11 },
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

    function getDialingTheme() {
        const dialingMusic = document.getElementById("dialing-music");
        const a = Math.floor(Math.random() * 5) + 1;

        if (a === 1) {
            dialingMusic.src = "audio/aoltv.mp3";
            dialingMusic.load();
        }
    }

    window.addEventListener("load", getDialingTheme);
}

function skipDialing() {
    const dialingMusic = document.getElementById('dialing-music');
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