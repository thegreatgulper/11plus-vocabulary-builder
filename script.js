const colors = [
    '#FF0000', '#FF0000',
    '#00FF00', '#00FF00',
    '#0000FF', '#0000FF',
    '#FFFF00', '#FFFF00',
    '#FF00FF', '#FF00FF',
    '#00FFFF', '#00FFFF',
    '#FFA500', '#FFA500',
    '#800080', '#800080'
];

let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    const shuffledColors = shuffle([...colors]);
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';

    shuffledColors.forEach((color, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.color = color;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(this)) return;

    this.style.backgroundColor = this.dataset.color;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.color === card2.dataset.color) {
        matchedPairs++;
        if (matchedPairs === 8) {
            alert('Congratulations! You won!');
        }
    } else {
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    flippedCards = [];
}

function resetGame() {
    matchedPairs = 0;
    flippedCards = [];
    createCards();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', createCards);