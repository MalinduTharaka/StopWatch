const display = document.getElementById('display');
const startStopBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

let startTime;
let updatedTime;
let difference = 0;
let timerInterval;
let Running = false;

function startStopWatch() {
    if (!Running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(update, 10);
        startStopBtn.textContent = 'Stop';
        Running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        Running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    difference = 0;
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
    Running = false;
}

function Lap() {
    if (Running) {
        const lapTime = document.createElement('div');
        lapTime.textContent = display.textContent;
        lapsContainer.appendChild(lapTime);
    }
}

function update() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = difference % 1000;

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

startStopBtn.addEventListener('click', startStopWatch);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', Lap);
