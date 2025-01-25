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

function startGame() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    word1 = document.getElementById('word1').value.toLowerCase();
    word2 = document.getElementById('word2').value.toLowerCase();
    
   
     
   
    if (player1 && player2 && word1 && word2) {
        document.querySelector('.player-input').style.display = 'none';
        document.querySelector('.startGame').style.display = 'none';
        document.querySelector('.game-area').style.display = 'block';
        updateTurnIndicator();
        updateWordDisplay();
        updateGuessedLetters();
    } else {
        alert('Vänligen ange båda spelarnas namn och ord.');
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

function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    let displayWord = '';
    const word = currentPlayer === 1 ? word2 : word1;
    const guessedLetters = currentPlayer === 1 ? guessedLetters2 : guessedLetters1;
    for (let letter of word) {
        displayWord += guessedLetters.includes(letter) ? letter : '_';
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

function makeGuess() {
    const guessInput = document.getElementById('guess-input').value.toLowerCase();
    const validLetterRegex = /^[a-zåäö]$/; // Only allow alphabetic characters and Swedish letters
    
    console.log("Regex test result:", validLetterRegex.test(guessInput));
    if (!validLetterRegex.test(guessInput)) {
        alert ('Ogiltig bokstav! Vänligen ange en giltig bokstav.');
        document.getElementById('guess-input').value = '';
        return;
    } 

    if (guessInput && guessInput.length === 1) {
        const word = currentPlayer === 1 ? word2 : word1;
        let guessedLetters = currentPlayer === 1 ? guessedLetters2 : guessedLetters1;
        if (!guessedLetters.includes(guessInput)) {
            guessedLetters.push(guessInput);
            if (!word.includes(guessInput)) {
                if (currentPlayer === 1) {
                    hangmanStatus2++;
                    updateHangman(hangmanStatus2);
                } else {
                    hangmanStatus1++;
                    updateHangman(hangmanStatus1);
                }
            }
            updateHangmanStatus();
            updateWordDisplay();
            updateGuessedLetters();
            if (checkWin(word, guessedLetters)) {
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

function resetGame() {
    currentPlayer = 1;
    guessedLetters1 = [];
    guessedLetters2 = [];
    hangmanStatus1 = 0;
    hangmanStatus2 = 0;
    document.querySelector('.player-input').style.display = 'block';
    document.querySelector('.game-area').style.display = 'none';
}

function toggleWordVisibility(wordId) {
    const wordInput = document.getElementById(wordId);
    const errorMessage = document.getElementById('error-message');
    const word = wordInput.value.toLowerCase();
    const validWordRegex = /^[a-zåäö]+$/; 

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

