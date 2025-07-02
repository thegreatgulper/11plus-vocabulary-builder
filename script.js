document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const targetsContainer = document.getElementById('targets-container');
    const scoreElement = document.getElementById('score-value');
    let score = 0;

    function createTarget() {
        const target = document.createElement('div');
        target.className = 'target';
        target.style.left = Math.random() * (window.innerWidth - 40) + 'px';
        target.style.top = Math.random() * (window.innerHeight - 40) + 'px';
        
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;

        target.addEventListener('click', () => {
            score += 10;
            scoreElement.textContent = score;
            target.remove();
            createTarget();
        });

        targetsContainer.appendChild(target);

        function moveTarget() {
            let x = parseFloat(target.style.left);
            let y = parseFloat(target.style.top);

            if (x + dx > window.innerWidth - 40 || x + dx < 0) dx = -dx;
            if (y + dy > window.innerHeight - 40 || y + dy < 0) dy = -dy;

            target.style.left = (x + dx) + 'px';
            target.style.top = (y + dy) + 'px';

            if (target.isConnected) {
                requestAnimationFrame(moveTarget);
            }
        }

        moveTarget();
    }

    // Create initial targets
    for (let i = 0; i < 5; i++) {
        createTarget();
    }
});