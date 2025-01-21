// Select elements
const timeDisplay = document.getElementById("timeDisplay");
const playPauseBtn = document.getElementById("playPauseBtn");
const resetLapsBtn = document.getElementById("resetLapsBtn");
const lapsList = document.getElementById("lapsList");

// Variables to track time and state
let timerInterval;
let isRunning = false;
let elapsedTime = 0; // Time in milliseconds

// Helper function to add leading zeros
function padZero(number, length = 2) {
    return String(number).padStart(length, "0");//padStart() method is used to add leading zeros to a string
}

// Convert time in milliseconds to MM:SS:MS format
function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

// Update the time display
function updateTime() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
function startTimer() {
    const startTime = Date.now() - elapsedTime; // Get the time when the timer starts or resumes
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTime();
    }, 100);
    isRunning = true;
}

// Stop the stopwatch
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Add a lap
function addLap() {
    const lapTime = formatTime(elapsedTime);
    const lapNumber = lapsList.children.length + 1;
    const lapItem = document.createElement("li");
    lapItem.className = "laps-item";
    lapItem.innerHTML = `<span class="number">#${lapNumber}</span><span class="time-stamp"> ${lapTime}</span>`;
    lapsList.appendChild(lapItem);
}

// Reset the stopwatch
function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateTime();
    lapsList.innerHTML = ""; // Clear laps
}

// Toggle between play and pause
playPauseBtn.addEventListener("click", () => {
    if (isRunning) {
        // Switch to Play button
        stopTimer();
        playPauseBtn.innerHTML = `
            <svg id="playIcon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
                <path d="M320-263v-438q0-15 10-24.17 10-9.16 23.33-9.16 4.34 0 8.84 1.16 4.5 1.17 8.83 3.5L715.67-510q7.66 5.33 11.5 12.33 3.83 7 3.83 15.67t-3.83 15.67q-3.84 7-11.5 12.33L371-234.33q-4.33 2.33-8.83 3.5-4.5 1.16-8.84 1.16-13.33 0-23.33-9.16Q320-248 320-263Z"/>
            </svg>
        `;
        resetLapsBtn.innerHTML = `
            <svg id="resetIcon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
                <path d="M240-306.67v-346.66q0-27.5 19.58-47.09Q279.17-720 306.67-720h346.66q27.5 0 47.09 19.58Q720-680.83 720-653.33v346.66q0 27.5-19.58 47.09Q680.83-240 653.33-240H306.67q-27.5 0-47.09-19.58Q240-279.17 240-306.67Z"/>
            </svg>
        `;
    } else {
        // Switch to Pause button
        playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5"><path d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z"/></svg>
    `;
    resetLapsBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5"><path d="M200-120v-680h348.67l18 84H800v380H536l-18-83.33H266.67V-120H200Z"/></svg>
    `;
        startTimer();
       
    }
});

// Reset or add lap
resetLapsBtn.addEventListener("click", () => {
    if (isRunning) {
        addLap(); // Add a lap if running
    } else {
        resetTimer(); // Reset if paused
    }
});
