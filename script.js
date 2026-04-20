let deck = [];
let currentCard = 0;
let showingFront = true;
let interval;

const flashcard = document.getElementById("flashcard");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");
const createBtn = document.getElementById("createBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const clearBtn = document.getElementById("clearBtn");
const cardCounter = document.getElementById("cardCounter");
const startTimerBtn = document.getElementById("startTimerBtn");
const stopTimerBtn = document.getElementById("stopTimerBtn");
const minutesInput = document.getElementById("minutes");
const timerDisplay = document.getElementById("timer");

function updateCardDisplay() {
    if (!cardFront || !cardBack || !cardCounter) return;

    if (deck.length === 0) {
        cardFront.textContent = "Add a question and answer.";
        cardBack.textContent = "Answer will appear here";
        cardCounter.textContent = "0/0";
        flashcard?.classList.remove("flipped");
        showingFront = true;
        return;
    }

    const { question, answer } = deck[currentCard];
    cardFront.textContent = question;
    cardBack.textContent = answer;
    cardCounter.textContent = `${currentCard + 1}/${deck.length}`;
    flashcard?.classList.toggle("flipped", !showingFront);
}

function resetCardFlip() {
    showingFront = true;
    flashcard?.classList.remove("flipped");
    updateCardDisplay();
}

if (createBtn) {
    createBtn.addEventListener("click", () => {
        const qInput = document.getElementById("q");
        const aInput = document.getElementById("a");
        const q = qInput?.value.trim();
        const a = aInput?.value.trim();

        if (!q || !a) {
            alert("Enter both a question and answer");
            return;
        }

        deck = [{ question: q, answer: a }];
        currentCard = 0;

        if (qInput) qInput.value = "";
        if (aInput) aInput.value = "";

        resetCardFlip();
    });
}

if (flashcard) {
    flashcard.addEventListener("click", () => {
        if (deck.length === 0) return;
        showingFront = !showingFront;
        flashcard.classList.toggle("flipped", !showingFront);
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (deck.length === 0) return;
        currentCard = (currentCard - 1 + deck.length) % deck.length;
        resetCardFlip();
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (deck.length === 0) return;
        currentCard = (currentCard + 1) % deck.length;
        resetCardFlip();
    });
}

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        deck = [];
        currentCard = 0;
        updateCardDisplay();
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function playDingSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function updateTimerDisplay(time) {
    if (timerDisplay) {
        timerDisplay.textContent = `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
    }
}

function checkTimer() {
    const timerData = JSON.parse(localStorage.getItem("timerData"));
    if (!timerData) return;

    const elapsed = Math.floor((Date.now() - timerData.startTime) / 1000);
    const remaining = timerData.duration - elapsed;

    if (remaining > 0) {
        updateTimerDisplay(remaining);
        localStorage.setItem("timerData", JSON.stringify({
            ...timerData,
            remaining: remaining
        }));
    } else {
        updateTimerDisplay(0);
        localStorage.removeItem("timerData");
        playDingSound();
        alert("Time's up!");
        if (stopTimerBtn) stopTimerBtn.style.display = "none";
        if (startTimerBtn) startTimerBtn.style.display = "inline-block";
    }
}

function startTimer() {
    const minutesValue = Number(minutesInput?.value);
    if (!minutesValue || minutesValue <= 0) {
        alert("Enter a positive number of minutes.");
        return;
    }

    const duration = Math.floor(minutesValue * 60);
    const timerData = {
        startTime: Date.now(),
        duration: duration,
        remaining: duration
    };

    localStorage.setItem("timerData", JSON.stringify(timerData));

    if (startTimerBtn) startTimerBtn.style.display = "none";
    if (stopTimerBtn) stopTimerBtn.style.display = "inline-block";

    updateTimerDisplay(duration);

    if (interval) clearInterval(interval);
    interval = setInterval(checkTimer, 1000);
}

function stopTimer() {
    localStorage.removeItem("timerData");
    clearInterval(interval);
    if (timerDisplay) timerDisplay.textContent = "";
    if (stopTimerBtn) stopTimerBtn.style.display = "none";
    if (startTimerBtn) startTimerBtn.style.display = "inline-block";
}

if (startTimerBtn) {
    startTimerBtn.addEventListener("click", startTimer);
}

if (stopTimerBtn) {
    stopTimerBtn.addEventListener("click", stopTimer);
}

// Check timer on page load
window.addEventListener("load", () => {
    checkTimer();
    const timerData = JSON.parse(localStorage.getItem("timerData"));
    if (timerData) {
        if (startTimerBtn) startTimerBtn.style.display = "none";
        if (stopTimerBtn) stopTimerBtn.style.display = "inline-block";
        if (interval) clearInterval(interval);
        interval = setInterval(checkTimer, 1000);
    }
});

function addTask() {
    const input = document.getElementById("task");
    const taskList = document.getElementById("taskList");
    if (!input || !input.value.trim() || !taskList) return;

    const li = document.createElement("li");
    li.textContent = input.value.trim();
    li.addEventListener("click", () => li.remove());
    taskList.appendChild(li);
    input.value = "";
}

function showPopup() {
    alert("Keep going! You're doing great!");
}

function goToW3Schools() {
    window.location.href = "https://www.w3schools.com/";
}