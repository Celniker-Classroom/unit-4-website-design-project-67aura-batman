let q = "";
let a = "";
let showingFront = true;

const card = document.getElementById("card");
const createBtn = document.getElementById("createBtn");
const startTimerBtn = document.getElementById("startTimerBtn");
const minutesInput = document.getElementById("minutes");
const timerDisplay = document.getElementById("timer");

if (createBtn) {
    createBtn.addEventListener("click", () => {
        q = document.getElementById("q").value.trim();
        a = document.getElementById("a").value.trim();

        if (!q || !a) {
            alert("Enter both a question and answer");
            return;
        }

        if (card) {
            card.innerText = q;
            showingFront = true;
        }
    });
}

if (card) {
    card.addEventListener("click", () => {
        if (!q || !a) return;
        card.innerText = showingFront ? a : q;
        showingFront = !showingFront;
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

let interval;

function startTimer() {
    const minutesValue = Number(minutesInput?.value);
    if (!minutesValue || minutesValue <= 0) {
        alert("Enter a positive number of minutes.");
        return;
    }

    let time = Math.floor(minutesValue * 60);
    clearInterval(interval);

    if (timerDisplay) {
        timerDisplay.innerText = `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
    }

    interval = setInterval(() => {
        time -= 1;
        if (timerDisplay) {
            timerDisplay.innerText = `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
        }

        if (time <= 0) {
            clearInterval(interval);
            alert("Time's up!");
        }
    }, 1000);
}

if (startTimerBtn) {
    startTimerBtn.addEventListener("click", startTimer);
}

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
