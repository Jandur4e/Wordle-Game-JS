const body = document.getElementById("body");
body.style.margin = "auto";
body.style.fontFamily = "Arial, Helvetica, sans-serif"
const words = ["inter", "river", "steve", "retro", "skopje", "apple", "email", "milan", "poker", "venus", "hyper", "olive", "games", "joker", "hokey", "learn", "eland", "tokyo"]
const wordle = words[Math.floor(Math.random() * words.length)].toUpperCase();
const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", "z", "x", "c", "v", "b", "n", "m", "<<"]
const guessRows = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]];
let currentLetter = 0;
let currentRow = 0;

const content = document.createElement("h1");
content.innerHTML = "WORDLE";
content.style.textAlign = "center";
content.style.color = "green"
content.style.textShadow = "0 0 20px red";
body.appendChild(content);
guessRows.forEach((guessRow, guessRowIndex) => {
    let paretnOfGuessValue = document.createElement("div");
    paretnOfGuessValue.setAttribute("id", "guessRow-" + guessRowIndex);
    paretnOfGuessValue.style.display = "flex";
    paretnOfGuessValue.style.gap = "5px";
    paretnOfGuessValue.style.width = "260px";
    paretnOfGuessValue.style.margin = "5px auto";
    body.appendChild(paretnOfGuessValue);
    guessRow.forEach((guess, guessIndex) => {
        let guessElement = document.createElement("div");
        guessElement.setAttribute("id", "guessRow-" + guessRowIndex + "-letter-" + guessIndex);
        guessElement.style.display = "flex";
        guessElement.style.justifyContent = "center";
        guessElement.style.alignItems = "center";
        guessElement.style.width = "45px";
        guessElement.style.height = "45px";
        guessElement.style.border = "2px solid blue";
        guessElement.style.borderRadius = "5px";
        guessElement.style.fontWeight = "900";
        paretnOfGuessValue.appendChild(guessElement);
    })
});
let buttonContent = document.createElement("div");
buttonContent.style.display = "flex";
buttonContent.style.flexWrap = "wrap";
buttonContent.style.justifyContent = "center";
buttonContent.style.gap = "5px";
buttonContent.style.width = "350px";
buttonContent.style.margin = "20px auto";
body.appendChild(buttonContent);
keys.forEach(key => {
    let button = document.createElement("button");
    button.setAttribute("id", key)
    button.addEventListener("click", () => clickButton(key));
    button.style.width = "30px";
    button.style.height = "30px";
    button.style.fontWeight = "700";
    button.style.backgroundColor = "pink";
    button.innerHTML = key.toUpperCase();
    buttonContent.appendChild(button);
})
let enter = document.getElementById("enter");
enter.style.width = "60px";
let backspace = document.getElementById("<<");
backspace.style.width = "35px";

function clickButton(letter) {
    console.log("clicked ", letter)
    if (letter == "<<") {
        deleteLetter()
    }
    else if (letter == "enter") {
        checkWord()
    }
    else {
        addLetter(letter)
    }
};

function addLetter(letter) {
    if (currentLetter < 5 && currentRow < 6) {
        let addedLetter = document.getElementById(`guessRow-${currentRow}-letter-${currentLetter}`)
        addedLetter.innerHTML = letter.toUpperCase();
        guessRows[currentRow][currentLetter] = letter.toUpperCase();
        addedLetter.setAttribute("value", letter.toUpperCase());
        currentLetter++;
        console.log(guessRows)
    }
};

function deleteLetter() {
    if (currentLetter > 0) {
        currentLetter--
        let wrongLetter = document.getElementById(`guessRow-${currentRow}-letter-${currentLetter}`);
        wrongLetter.innerHTML = "";
        guessRows[currentRow][currentLetter] = "";
    }
};

function checkWord() {
    let guessW = guessRows[currentRow].join("");
    let trys = document.createElement("h3");
    trys.setAttribute("id", "message");
    trys.style.textAlign = "center";
    body.appendChild(trys);
    let message = document.getElementById("message");
    addColorToKey();
    console.log("your guest word is ", guessW, " and wordle is ", wordle);
    if (currentLetter == 5) {
        if (guessW == wordle) {
            alert("Well Done !!!")
            return
        }
        else {
            if (currentRow >= 5) {
                alert("Game Over");
            }
            else if (currentRow < 5) {
                setTimeout(() => {
                    if (currentRow == 1) {
                        message.innerHTML = "You have five attempts left";
                        message.style.color = "yellowgreen"
                    }
                    if (currentRow == 2) {
                        message.innerHTML = "You have four attempts left";
                        message.style.color = "gold"
                    }
                    if (currentRow == 3) {
                        message.innerHTML = "You have three more attempts left";
                        message.style.color = "orange";
                    }
                    if (currentRow == 4) {
                        message.innerHTML = "You have two more attempts left";
                        message.style.color = "orangered"
                    }
                    if (currentRow == 5) {
                        message.innerHTML = "You have one more try left";
                        message.style.color = "red"
                    }
                }, 1000);
                currentRow++;
                currentLetter = 0;
            }
        }
    }
    else {
        alert("Word must be with 5 letter");
    }
};


function addColorToKey() {
    let rowLetter = document.querySelector("#guessRow-" + currentRow).childNodes;
    rowLetter.forEach((letter, index) => {
        let dataLetter = letter.getAttribute("value");
        setTimeout(() => {
            if (dataLetter == wordle[index]) {
                letter.classList.add("green");
                letter.style.backgroundColor = "green";
            }
            else if (wordle.includes(dataLetter)) {
                letter.classList.add("yellow");
                letter.style.backgroundColor = "yellow";
            }
            else {
                letter.classList.add("grey");
                letter.style.backgroundColor = "grey";
            }
        }, 200 * index)
    })
};

