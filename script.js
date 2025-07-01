// Flashcard game data (maximum 10 words per question/answer)
const flashcards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "Largest planet in our solar system?", answer: "Jupiter" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { question: "What is H2O commonly known as?", answer: "Water" },
    { question: "How many continents are there?", answer: "Seven" },
    { question: "What is the smallest prime number?", answer: "Two" },
    { question: "Which ocean is the largest?", answer: "Pacific Ocean" },
    { question: "What year did World War II end?", answer: "1945" },
    { question: "What is the hardest natural substance?", answer: "Diamond" },
    { question: "Which country invented paper?", answer: "China" }
];

class FlashcardGame {
    constructor() {
        this.currentCardIndex = 0;
        this.score = 0;
        this.isFlipped = false;
        this.gameStarted = false;
        this.gameEnded = false;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.flashcard = document.getElementById('flashcard');
        this.questionEl = document.getElementById('question');
        this.answerEl = document.getElementById('answer');
        this.scoreEl = document.getElementById('score');
        this.cardCounterEl = document.getElementById('card-counter');
        this.flipBtn = document.getElementById('flip-btn');
        this.answerBtns = document.getElementById('answer-btns');
        this.correctBtn = document.getElementById('correct-btn');
        this.incorrectBtn = document.getElementById('incorrect-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.progressFill = document.getElementById('progress-fill');
        this.gameOverEl = document.getElementById('game-over');
        this.finalScoreEl = document.getElementById('final-score');
        this.performanceMessageEl = document.getElementById('performance-message');
    }
    
    attachEventListeners() {
        this.flashcard.addEventListener('click', () => this.flipCard());
        this.flipBtn.addEventListener('click', () => this.flipCard());
        this.correctBtn.addEventListener('click', () => this.answerCard(true));
        this.incorrectBtn.addEventListener('click', () => this.answerCard(false));
        this.nextBtn.addEventListener('click', () => this.nextCard());
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }
    
    flipCard() {
        if (!this.gameStarted) {
            this.startGame();
            return;
        }
        
        if (this.gameEnded) return;
        
        this.isFlipped = !this.isFlipped;
        this.flashcard.classList.toggle('flipped', this.isFlipped);
        
        if (this.isFlipped) {
            this.flipBtn.style.display = 'none';
            this.answerBtns.style.display = 'flex';
        } else {
            this.flipBtn.style.display = 'inline-block';
            this.answerBtns.style.display = 'none';
        }
    }
    
    startGame() {
        this.gameStarted = true;
        this.loadCurrentCard();
        this.flipBtn.textContent = 'Flip Card';
        this.updateDisplay();
    }
    
    loadCurrentCard() {
        const currentCard = flashcards[this.currentCardIndex];
        this.questionEl.textContent = currentCard.question;
        this.answerEl.textContent = currentCard.answer;
        
        // Reset card state
        this.isFlipped = false;
        this.flashcard.classList.remove('flipped');
        this.flipBtn.style.display = 'inline-block';
        this.answerBtns.style.display = 'none';
        this.nextBtn.style.display = 'none';
    }
    
    answerCard(isCorrect) {
        if (isCorrect) {
            this.score++;
            this.correctBtn.style.background = 'linear-gradient(135deg, #00b894 0%, #00a085 100%)';
            this.incorrectBtn.style.opacity = '0.5';
        } else {
            this.incorrectBtn.style.background = 'linear-gradient(135deg, #e17055 0%, #d63031 100%)';
            this.correctBtn.style.opacity = '0.5';
        }
        
        this.answerBtns.style.display = 'none';
        this.nextBtn.style.display = 'inline-block';
        this.updateDisplay();
        
        // Reset button styles after animation
        setTimeout(() => {
            this.correctBtn.style.background = 'linear-gradient(135deg, #00b894 0%, #00a085 100%)';
            this.incorrectBtn.style.background = 'linear-gradient(135deg, #e17055 0%, #d63031 100%)';
            this.correctBtn.style.opacity = '1';
            this.incorrectBtn.style.opacity = '1';
        }, 1000);
    }
    
    nextCard() {
        this.currentCardIndex++;
        
        if (this.currentCardIndex >= flashcards.length) {
            this.endGame();
        } else {
            this.loadCurrentCard();
            this.updateDisplay();
        }
    }
    
    endGame() {
        this.gameEnded = true;
        this.flashcard.style.display = 'none';
        this.flipBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
        this.gameOverEl.style.display = 'block';
        this.restartBtn.style.display = 'inline-block';
        
        this.finalScoreEl.textContent = `Your final score: ${this.score}/${flashcards.length}`;
        
        const percentage = (this.score / flashcards.length) * 100;
        let message = '';
        
        if (percentage >= 90) {
            message = 'Outstanding! You\'re a flashcard master! 🏆';
        } else if (percentage >= 80) {
            message = 'Excellent work! Keep it up! 🌟';
        } else if (percentage >= 70) {
            message = 'Good job! You\'re getting there! 👍';
        } else if (percentage >= 60) {
            message = 'Not bad! Practice makes perfect! 📚';
        } else {
            message = 'Keep studying! You\'ll improve! 💪';
        }
        
        this.performanceMessageEl.textContent = message;
    }
    
    restartGame() {
        this.currentCardIndex = 0;
        this.score = 0;
        this.isFlipped = false;
        this.gameStarted = false;
        this.gameEnded = false;
        
        this.flashcard.style.display = 'block';
        this.flashcard.classList.remove('flipped');
        this.gameOverEl.style.display = 'none';
        this.restartBtn.style.display = 'none';
        
        this.questionEl.textContent = 'Click to start!';
        this.answerEl.textContent = 'Answer appears here';
        this.flipBtn.textContent = 'Start Game';
        this.flipBtn.style.display = 'inline-block';
        this.answerBtns.style.display = 'none';
        this.nextBtn.style.display = 'none';
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.scoreEl.textContent = `Score: ${this.score}`;
        this.cardCounterEl.textContent = `Card ${this.currentCardIndex + 1} of ${flashcards.length}`;
        
        const progress = ((this.currentCardIndex + (this.gameEnded ? 1 : 0)) / flashcards.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlashcardGame();
});