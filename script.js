let currentPlayer = 1;
let player1 = '';
let player2 = '';

function startGame() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    if (player1 && player2) {
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
    const guessInput = document.getElementById('guess-input').value;
    if (guessInput) {
        // här behöver vi lägga till logik för gissningen
        console.log(`Spelare ${currentPlayer} gissade: ${guessInput}`);
        // Byt tur
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateTurnIndicator();
        // Rensa inmatningsfältet
        document.getElementById('guess-input').value = '';
    } else {
        alert('Vänligen ange en gissning.');
    }
}
