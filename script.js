const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080'
];

let cards = [...colors, ...colors];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    shuffle(cards);
    
    cards.forEach((color, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (
        flippedCards.length === 2 ||
        flippedCards.includes(this) ||
        this.classList.contains('matched')
    ) return;

    this.style.backgroundColor = this.dataset.color;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.color === card2.dataset.color;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === colors.length) {
            alert('Congratulations! You won!');
        }
    } else {
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }

    flippedCards = [];
}

document.addEventListener('DOMContentLoaded', createBoard);
