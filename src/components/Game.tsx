import { useState } from 'react';
import Board from './Board';

// Helper function to check the winner
function calculateWinner(squares: (string | null)[]): string | null {
  // Possible winning lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Loop trough winning lines, and check if corresponding squares have same values
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  // Game history containing array of boards
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);

  // Used for keeping track of the current move number
  const [currentMove, setCurrentMove] = useState<number>(0);

  // Helper variable for checking which players turn it is
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  // Latest gameboard squares
  const [currentSquares, setCurrentSquares] = useState<(string | null)[]>(
    history[currentMove]
  );

  // Helper variable bound to function -> easier
  const winner = calculateWinner(currentSquares);

  // Handle the most recent game move
  function handlePlay(index: number) {
    // Get a copy of current gameboard squares
    const newSquares = currentSquares.slice();

    // Create new updated history, including the most recent game move
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];

    // Check if there is a winner or all squares are filled
    if (winner || newSquares[index]) return;

    // Add new value to the recently played square
    newSquares[index] = xIsNext ? 'X' : 'O';

    // Update history
    setHistory(newHistory);

    // Update the current move
    setCurrentMove(newHistory.length - 1);

    // Update current gameboard squares
    setCurrentSquares(newSquares);

    // Update next player
    setXIsNext(!xIsNext);
  }

  // Helper method to jump between moves
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
    setCurrentSquares(history[nextMove]);
  }

  // Helper variable to display game's move history
  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li className="step step-primary" key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex justify-center items-center h-screen bg-base-200 space-x-4">
      <div className="card shadow-xl p-6 bg-base-100 w-96">
        <div className="card-body">
          <h1 className="card-title text-center text-3xl font-bold">
            Tic-Tac-Toe
          </h1>
          {winner && (
            <div
              className={`alert ${
                winner === 'X' ? 'alert-success' : 'alert-info'
              } shadow-lg mb-4`}
            >
              <div>
                <span className="text-lg font-bold">
                  {winner === 'X'
                    ? '🎉 X is the Winner!'
                    : '🎉 O is the Winner!'}
                </span>
              </div>
            </div>
          )}
          <div className="text-xl font-bold mb-4">
            {winner ? '' : `Next player: ${xIsNext ? 'X' : 'O'}`}
          </div>
          <Board squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reset Game
          </button>
        </div>
      </div>
      <div className="card shadow-xl p-6 bg-base-100 w-96">
        <div className="card-body">
          <h1 className="card-title text-center text-2xl font-bold">Moves</h1>
          <ol className="steps steps-vertical">{moves}</ol>
        </div>
      </div>
    </div>
  );
}
