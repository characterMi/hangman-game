const secretPhrases = ["never", "you", "that", "bullet", "break", "help", "well", "dragon", "last"];

let randomItem = null;
let clicked = [];
let result = null;
let mistakes = 0;

function selectRandomItem() {
    randomItem = secretPhrases[Math.round(Math.random() * secretPhrases.length)];
    document.getElementById("letters").addEventListener("click", buttonHandler)
    window.addEventListener("keydown", keyHandler)
    console.log(randomItem)
}

function setUnderLines() {
    let splitedWord = randomItem.split("");
    let loopedWord = splitedWord.map(letter => (clicked.indexOf(letter) >= 0 ? letter : "_"))
    result = loopedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`
}

function checkIfWon() {
    if (randomItem === result) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "assets/winner.png";
    }
}

function checkIfLost() {
    if (mistakes === 6) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("clue").innerHTML = `<p style="font-size: 2rem">Random word is: ${randomItem}</p>`
    }
}

function updateHangmanPicture() {
    const image = document.getElementById("image").querySelector("img");
    image.src = `assets/hangman${mistakes}.png`
}

function letterHandler(letter) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
        setUnderLines();
        checkIfWon();
    } else {
        mistakes++;
        checkIfLost();
        updateHangmanPicture()
    }
}

function buttonHandler(event) {
    letterHandler(event.target.id)
}

function keyHandler(event) {
    letterHandler(event.key)
}



selectRandomItem();
setUnderLines();