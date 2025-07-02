document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => moveTile(tile));
  });
});

function moveTile(tile) {
  const emptyTile = document.querySelector('.empty');
  const tileIndex = parseInt(tile.dataset.index);
  const emptyIndex = parseInt(emptyTile.dataset.index);
  
  if (isAdjacent(tileIndex, emptyIndex)) {
    // Swap data-index attributes
    tile.dataset.index = emptyIndex;
    emptyTile.dataset.index = tileIndex;
    
    // Swap positions in DOM
    const tileParent = tile.parentNode;
    const tempNode = document.createElement('div');
    tileParent.insertBefore(tempNode, tile);
    tileParent.insertBefore(tile, emptyTile);
    tileParent.insertBefore(emptyTile, tempNode);
    tileParent.removeChild(tempNode);
    
    checkWin();
  }
}

function isAdjacent(index1, index2) {
  const row1 = Math.floor((index1 - 1) / 3);
  const col1 = (index1 - 1) % 3;
  const row2 = Math.floor((index2 - 1) / 3);
  const col2 = (index2 - 1) % 3;
  
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

function shuffleTiles() {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const board = document.querySelector('.puzzle-board');
  
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap data-index attributes
    const tempIndex = tiles[i].dataset.index;
    tiles[i].dataset.index = tiles[j].dataset.index;
    tiles[j].dataset.index = tempIndex;
    
    // Swap positions in DOM
    board.insertBefore(tiles[j], tiles[i]);
    board.insertBefore(tiles[i], tiles[j]);
  }
}

function checkWin() {
  const tiles = document.querySelectorAll('.tile');
  let isWin = true;
  
  tiles.forEach(tile => {
    const currentIndex = parseInt(tile.dataset.index);
    const correctIndex = Array.from(tiles).indexOf(tile) + 1;
    if (currentIndex !== correctIndex) {
      isWin = false;
    }
  });
  
  if (isWin) {
    setTimeout(() => alert('Congratulations! You won!'), 100);
  }
}