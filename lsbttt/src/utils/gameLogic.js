export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function findBestMove(squares, cpuMark) {
  const opponentMark = cpuMark === 'X' ? 'O' : 'X';

  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      const tempSquares = [...squares];
      tempSquares[i] = cpuMark;
      if (calculateWinner(tempSquares) === cpuMark) return i;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      const tempSquares = [...squares];
      tempSquares[i] = opponentMark;
      if (calculateWinner(tempSquares) === opponentMark) return i;
    }
  }
  
  if (!squares[4]) return 4;
  
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => !squares[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => !squares[i]);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }
  
  return null;
}