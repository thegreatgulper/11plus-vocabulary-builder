document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    let currentBoard = Array(9).fill('');
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (currentBoard[index] === '' && gameActive) {
            makeMove(index, 'X');
            if (gameActive) {
                setTimeout(makeAIMove, 500);
            }
        }
    }

    function makeMove(index, symbol) {
        currentBoard[index] = symbol;
        cells[index].textContent = symbol;
        
        if (checkWin(symbol)) {
            gameActive = false;
            alert(`${symbol} wins!`);
        } else if (!currentBoard.includes('')) {
            gameActive = false;
            alert('Draw!');
        }
    }

    function makeAIMove() {
        const availableMoves = currentBoard.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);

        if (availableMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableMoves.length);
            const moveIndex = availableMoves[randomIndex];
            makeMove(moveIndex, 'O');
        }
    }

    function checkWin(symbol) {
        return winningCombinations.some(combination => {
            return combination.every(index => currentBoard[index] === symbol);
        });
    }

    function restartGame() {
        currentBoard = Array(9).fill('');
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
    }
});