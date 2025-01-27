let currentPlayer = 1;
let player1 = '';
let player2 = '';
let word1 = '';
let word2 = '';
let guessedLetters1 = [];
let guessedLetters2 = [];
let hangmanStatus1 = 0;
let hangmanStatus2 = 0;
const maxTries = 6;




function selectGuests() {
    // Assign default guest names
    document.getElementById('player1').value = 'Guest 1';
    document.getElementById('player2').value = 'Guest 2';

    // Automatically start the game after selecting guests
    startGame();
}


//updated
function startGame() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    /*word1 = document.getElementById('word1').value.toLowerCase();
    word2 = document.getElementById('word2').value.toLowerCase();*/ //this here we don't need anymore the player should have the word fetched automatically. (william)
    
   //commenting out the code like this is not good practice as it would confuse other programmers reading the code 
   //but this time i will do it to make it easy for you guys see what i have changed  (William)
     
   
    if (player1 && player2 /*&& word1 && word2*/) {
        fetch('words.json')
        .then(response => response.json())
        .then(data => {
     if (Array.isArray(data) && data.length > 0) {
    word1 = data[Math.floor(Math.random() * data.length)].toLowerCase();
    console.log("Selected random word:", word1);

        document.querySelector('.player-input').style.display = 'none';
        document.querySelector('.startGame').style.display = 'none';
        document.querySelector('.game-area').style.display = 'block';
        updateTurnIndicator();
        updateWordDisplay();
        updateGuessedLetters();
    } else {
        alert('Vänligen ange båda spelarnas namn och ord.');
    }  })
    .catch(error => {
        alert('Error fetching words: ' + error);
    });
} else {
alert('Vänligen ange båda spelarnas namn.');
}
}
function updateTurnIndicator() {
    const turnIndicator = document.getElementById('turn-indicator');
    if (currentPlayer === 1) {
        turnIndicator.textContent = `Det är ${player1}s tur.`;
    } else {
        turnIndicator.textContent = `Det är ${player2}s tur.`;
    }
}
//updated
function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    let displayWord = '';
 // Combine guessed letters from both players
 const allGuessedLetters = guessedLetters1.concat(guessedLetters2);

    // Use the globally selected random word and guessed letters array
    for (let letter of word1) {
        displayWord += allGuessedLetters.includes(letter) ? letter : '_';
        displayWord += ' ';
    }
    
    wordDisplay.textContent = displayWord.trim();
}


function updateGuessedLetters() {
    const guessedLettersDisplay = document.getElementById('guessed-letters');
    const guessedLetters = currentPlayer === 1 ? guessedLetters2 : guessedLetters1;
    guessedLettersDisplay.textContent = `Valda bokstäver: ${guessedLetters.join(', ')}`;
}

function updateHangmanStatus() {
    const hangmanStatus = document.getElementById('hangman-status');
    const status1 = `${player1}s gubbe: ${hangmanStatus1}/${maxTries}`;
    const status2 = `${player2}s gubbe: ${hangmanStatus2}/${maxTries}`;
    hangmanStatus.textContent = `${status1}\n${status2}`;
}
//updated
function makeGuess() {
    const guessInput = document.getElementById('guess-input').value.toLowerCase();
    const validLetterRegex = /^[a-z]$/; // Only allow alphabetic characters(i changed it to english)
    
    console.log("Regex test result:", validLetterRegex.test(guessInput));
    if (!validLetterRegex.test(guessInput)) {
        alert ('Ogiltig bokstav! Vänligen ange en giltig bokstav.');
        document.getElementById('guess-input').value = '';
        return;
    } 

    if (guessInput && guessInput.length === 1) {
        let guessedLetters = currentPlayer === 1 ? guessedLetters1 : guessedLetters2;

        if (!guessedLetters.includes(guessInput)) {
            guessedLetters.push(guessInput);

            // Check if the guessed letter is in the randomly selected word
            if (!word1.includes(guessInput)) {
                if (currentPlayer === 1) {
                    hangmanStatus1++;
                    updateHangman(hangmanStatus1);
                } else {
                    hangmanStatus2++;
                    updateHangman(hangmanStatus2);
                }
            }
            updateHangmanStatus();
            updateWordDisplay();
            updateGuessedLetters();

            // Check for win condition
            if (checkWin(word1, guessedLetters1.concat(guessedLetters2))) {
                alert(`Grattis ${currentPlayer === 1 ? player1 : player2}, du har vunnit!`);
                resetGame();
            } else if (hangmanStatus1 >= maxTries || hangmanStatus2 >= maxTries) {
                alert(`Game over! ${currentPlayer === 1 ? player2 : player1} vann.`);
                resetGame();
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateTurnIndicator();
            }
            document.getElementById('guess-input').value = '';
        } else {
            alert('Den bokstaven har redan valts. Välj en annan bokstav.');
        }
    } else {
        alert('Vänligen ange en giltig bokstav.');
    }
}

function checkWin(word, guessedLetters) {
    for (let letter of word) {
        if (!guessedLetters.includes(letter)) {
            return false;
        }
    }
    return true;
}
function refreshPage() {  // this is to refresh the page and rest the game.
    location.reload();
}

function resetGame() {
    currentPlayer = 1;
    guessedLetters1 = [];
    guessedLetters2 = [];
    hangmanStatus1 = 0;
    hangmanStatus2 = 0;
    document.querySelector('.player-input').style.display = 'block';
    document.querySelector('.game-area').style.display = 'none';
    refreshPage();
}

function toggleWordVisibility(wordId) {
    const wordInput = document.getElementById(wordId);
    const errorMessage = document.getElementById('error-message');
    const word = wordInput.value.toLowerCase();
    const validWordRegex = /^[a-z]+$/; 

    if (!validWordRegex.test(word)) {
       // alert ('Ogiltig bokstav! Vänligen ange en giltig bokstav.');
        errorMessage.style.display = 'block'; // Show error message if invalid word
        return
    } else {
        errorMessage.style.display = 'none'; // Hide error message if valid word
    }

    if (wordInput.type === 'password') {
        wordInput.type = 'text';
    } else {
        wordInput.type = 'password';
    }
}

// Hangman parts in order
const hangmanParts = [
    document.getElementById('head'),
    document.getElementById('body'),
    document.getElementById('left-arm'),
    document.getElementById('right-arm'),
    document.getElementById('left-leg'),
    document.getElementById('right-leg')
];

// Function to update hangman based on wrong guesses
function updateHangman(wrongGuessCount) {
    if (wrongGuessCount <= hangmanParts.length) {
        hangmanParts[wrongGuessCount - 1].style.display = 'block'; // Show part
    }
}

// Reset the hangman for a new game
function resetHangman() {
    hangmanParts.forEach(part => {
        part.style.display = 'none'; // Hide all parts
    });
}

// Example usage in your game logic
let wrongGuessCount = 0;

// Call this function whenever the player makes an incorrect guess
function wrongGuess() {
    wrongGuessCount++;
    updateHangman(wrongGuessCount);

    if (wrongGuessCount === hangmanParts.length) {
        alert('Game over! Hangman is complete.');
    }
}

// Reset the hangman when starting a new game
resetHangman();

