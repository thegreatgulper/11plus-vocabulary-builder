const colors = [
    '#e74c3c', '#e74c3c',
    '#3498db', '#3498db',
    '#2ecc71', '#2ecc71',
    '#f1c40f', '#f1c40f',
    '#9b59b6', '#9b59b6',
    '#e67e22', '#e67e22',
    '#1abc9c', '#1abc9c',
    '#34495e', '#34495e'
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

function createCard(color, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', () => flipCard(card, color));
    return card;
}

function flipCard(card, color) {
    if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push({ card, color });

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.color === second.color) {
        first.card.classList.add('matched');
        second.card.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === 8) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    } else {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
    }

    flippedCards = [];
}

function initializeGame() {
    const shuffledColors = shuffle(colors);
    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = '';

    shuffledColors.forEach((color, index) => {
        const card = createCard(color, index);
        cardsGrid.appendChild(card);
    });
}

function resetGame() {
    matchedPairs = 0;
    flippedCards = [];
    initializeGame();
}

initializeGame();