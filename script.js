// Digital Clock
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    clock.innerText = `${hours}:${minutes}:${seconds}`;

    // Check for alarm time, but only if the alarm hasn't already rung
    checkAlarm(hours, minutes);
}

setInterval(updateClock, 1000);

// Alarm Functionality
let alarmTime = null;
let alarmSound = new Audio('alarm.mp3');  // Replace with your actual sound file path
let alarmRinging = false;

function setAlarm() {
    const alarmInput = document.getElementById('alarm-time');
    alarmTime = alarmInput.value;
    alert(`Alarm set for ${alarmTime}`);
    document.getElementById('alarm-status').innerText = `Alarm set for ${alarmTime}`;
}

// Check if current time matches alarm time
function checkAlarm(hours, minutes) {
    // Only trigger the alarm if it hasn't already rung
    if (alarmTime === `${hours}:${minutes}` && !alarmRinging) {
        alarmRinging = true;
        alarmSound.play();  // Play sound when alarm rings
        document.getElementById('alarm-status').innerText = "Alarm is ringing!";
        document.getElementById('stop-alarm-btn').style.display = "inline-block";  // Show "Stop Alarm" button
    }
}

// Stop Alarm
function stopAlarm() {
    if (alarmRinging) {
        alarmRinging = false;
        alarmSound.pause();  // Stop the alarm sound
        alarmSound.currentTime = 0;  // Reset the sound to the beginning
        document.getElementById('alarm-status').innerText = '';  // Clear the alarm status message
        document.getElementById('stop-alarm-btn').style.display = "none";  // Hide "Stop Alarm" button
    }
}

// Reset Alarm (optional)
function resetAlarm() {
    alarmTime = null;
    document.getElementById('alarm-status').innerText = '';
    document.getElementById('stop-alarm-btn').style.display = "none";  // Hide "Stop Alarm" button
    alarmRinging = false;  // Reset alarm state
}

// Stopwatch Functionality
let stopwatchInterval;
let stopwatchSeconds = 0;
let stopwatchRunning = false;

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchSeconds++;
            displayStopwatch();
        }, 1000);
    }
}

function stopStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    displayStopwatch();
}

function displayStopwatch() {
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const hours = Math.floor(stopwatchSeconds / 3600);
    const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
    const seconds = stopwatchSeconds % 60;

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    stopwatchDisplay.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
