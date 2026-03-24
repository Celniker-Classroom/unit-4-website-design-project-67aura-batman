let qValue = "";
let aValue = "";
let showingFront = true;
let cardSet = [];

const userQ = document.getElementById("userQ");
const userA = document.getElementById("userA");
const display = document.getElementById("display");
const makeCardBtn = document.getElementById("makeCardBtn");
const flipBtn = document.getElementById("flipBtn");
const addToSetBtn = document.getElementById("addToSetBtn");
const clearSetBtn = document.getElementById("clearSetBtn");
const saveSetBtn = document.getElementById("saveSetBtn");
const cardSetList = document.getElementById("cardSetList");
const setCount = document.getElementById("setCount");

function makeCard() {
    qValue = userQ.value.trim();
    aValue = userA.value.trim();

    if (!qValue || !aValue) {
        alert("Please enter both a question and an answer before creating a card.");
        return;
    }

    display.innerText = qValue;
    showingFront = true;
    document.getElementById("cardBox").classList.remove("empty");
}

function flip() {
    if (!qValue || !aValue) {
        alert("Create a card first by entering question and answer.");
        return;
    }

    if (showingFront) {
        display.innerText = aValue;
    } else {
        display.innerText = qValue;
    }

    showingFront = !showingFront;
}

function updateSetUI() {
    cardSetList.innerHTML = "";
    if (cardSet.length === 0) {
        setCount.innerText = "0 cards in this set.";
        return;
    }

    setCount.innerText = `${cardSet.length} card${cardSet.length === 1 ? "" : "s"} in this set.`;

    for (let i = 0; i < cardSet.length; i++) {
        const card = cardSet[i];
        const li = document.createElement("li");
        li.innerText = `${i + 1}. Q: ${card.question} | A: ${card.answer}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.style.marginLeft = "10px";
        removeBtn.addEventListener("click", () => {
            cardSet.splice(i, 1);
            updateSetUI();
        });

        li.appendChild(removeBtn);
        cardSetList.appendChild(li);
    }
}

function addToSet() {
    if (!qValue || !aValue) {
        alert("Create a card first by entering question and answer, then click 'Add Card to Set'.");
        return;
    }

    cardSet.push({ question: qValue, answer: aValue });
    updateSetUI();

    // Optional: clear current input after adding
    userQ.value = "";
    userA.value = "";
    qValue = "";
    aValue = "";
    display.innerText = "The card is empty!";
    showingFront = true;
}

function clearSet() {
    if (confirm("Clear the entire card set?")) {
        cardSet = [];
        updateSetUI();
    }
}

function saveSet() {
    if (cardSet.length === 0) {
        alert("No cards to save. Add cards to the set first.");
        return;
    }

    localStorage.setItem("flashcardSet", JSON.stringify(cardSet));
    alert("Card set saved to localStorage (load with browser devtools or page reload on future version).\n");
}

makeCardBtn.addEventListener("click", makeCard);
flipBtn.addEventListener("click", flip);
addToSetBtn.addEventListener("click", addToSet);
clearSetBtn.addEventListener("click", clearSet);
saveSetBtn.addEventListener("click", saveSet);

// Load set from localStorage in case user previously saved
function loadSavedSet() {
    const current = localStorage.getItem("flashcardSet");
    if (!current) return;

    try {
        const parsed = JSON.parse(current);
        if (Array.isArray(parsed)) {
            cardSet = parsed;
            updateSetUI();
        }
    } catch (err) {
        console.error("Failed to parse saved flashcard set", err);
    }
}

loadSavedSet();
