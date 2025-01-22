let currentPlayer = 1;
let player1 = '';
let player2 = '';
let secretWord = ''; // secret word to guess
let displayedWord = ''; // show secret word in the result
let incorrectGuesses = []; 
const maxIncorrectGuesses = 6; // spelare kan gissa max 6 gånger

function startGame() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    if (player1 && player2) {
        secretWord = prompt(`${player1}, ange ett ord för ${player2} att gissa:`).toUpperCase();
                if (!secretWord || !/^[A-ZÅÄÖ]+$/.test(secretWord)) {
                    alert('Ordet måste bara innehålla bokstäver.');
                    return;
                }
                displayedWord = '_'.repeat(secretWord.length);
                document.getElementById('word-display').textContent = displayedWord.split('').join(' ');
                incorrectGuesses = [];
                document.getElementById('incorrect-guesses').textContent = 'Fel gissningar: ';
                document.getElementById('hangman').textContent = '';
                
                document.querySelector('.player-input').style.display = 'none';
                document.querySelector('.game-area').style.display = 'block';
                updateTurnIndicator();
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

function makeGuess() {
    const guessInput = document.getElementById('guess-input').value.toUpperCase();
    document.getElementById('guess-input').value = '';
   /* if (guessInput) {
        // här behöver vi lägga till logik för gissningen
        console.log(`Spelare ${currentPlayer} gissade: ${guessInput}`);
        // Byt tur
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateTurnIndicator();
        // Rensa inmatningsfältet
        document.getElementById('guess-input').value = '';
    } else {
        alert('Vänligen ange en gissning.');
    }*/
   //Validate the input: must be a single letter and match allowed characters.
        if (!guessInput || guessInput.length !== 1 || !/^[A-ZÅÄÖ]$/.test(guessInput)) {
            alert('Vänligen ange en giltig bokstav.');
            return;
        }
     // Check if the guess has already been made.
    if (displayedWord.includes(guessInput) || incorrectGuesses.includes(guessInput)) {
        alert('Denna bokstav har redan gissats. Försök igen.');
        return;
    }
      // Handle correct or incorrect guess.
    if (secretWord.includes(guessInput)) {
        // Correct guess: Update displayed word.
        let updatedWord = '';
        for (let i = 0; i < secretWord.length; i++) {
            updatedWord += secretWord[i] === guessInput ? guessInput : displayedWord[i];
        }
        displayedWord = updatedWord;
        document.getElementById('word-display').textContent = displayedWord.split('').join(' ');

        // Check if the word is fully guessed.
        if (!displayedWord.includes('_')) {
            alert(`Grattis! ${getCurrentPlayerName()} vann! Ordet var "${secretWord}".`);
            resetGame();
            return;
        }
    } else {
        // Incorrect guess: Add to incorrect guesses and update the hangman display.
        incorrectGuesses.push(guessInput);
        document.getElementById('incorrect-guesses').textContent = `Fel gissningar: ${incorrectGuesses.join(', ')}`;
        updateHangman();

        // Check if the game is over (max incorrect guesses reached).
        if (incorrectGuesses.length >= maxIncorrectGuesses) {
            alert(`Spelet över! Ordet var "${secretWord}".`);
            resetGame();
            return;
        }
    } 
    // Switch turns and update the turn indicator.
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateTurnIndicator();

}
// häng gubbe funktion visa en del of kroppen vajrge spelare gissar  fel
function updateHangman() { 
    const hangmanStages = [
        '',
        'Huvud',
        'Huvud, Kropp',
        'Huvud, Kropp, En Arm',
        'Huvud, Kropp, Två Armar',
        'Huvud, Kropp, Två Armar, Ett Ben',
        'Huvud, Kropp, Två Armar, Två Ben (Hängd)'
    ];
    document.getElementById('hangman').textContent = hangmanStages[incorrectGuesses.length];
}

function getCurrentPlayerName() {
    return currentPlayer === 1 ? player1 : player2;
}

function resetGame() {
    document.querySelector('.player-input').style.display = 'block';
    document.querySelector('.game-area').style.display = 'none';
    currentPlayer = 1;
}
