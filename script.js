document.addEventListener('DOMContentLoaded', () => {
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

    function createBoard() {
        const grid = document.querySelector('.grid');
        grid.innerHTML = '';
        matchedPairs = 0;
        const shuffledColors = shuffle([...colors]);

        shuffledColors.forEach((color, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.color = color;
            card.dataset.index = index;
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length === 2) return;
        if (this.classList.contains('matched')) return;
        if (flippedCards.length === 1 && flippedCards[0].dataset.index === this.dataset.index) return;

        this.style.backgroundColor = this.dataset.color;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.color === card2.dataset.color) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === 8) {
                alert('Congratulations! You won!');
            }
        } else {
            card1.style.backgroundColor = '#ccc';
            card2.style.backgroundColor = '#ccc';
        }
        flippedCards = [];
    }

    document.getElementById('restart').addEventListener('click', createBoard);
    createBoard();
});