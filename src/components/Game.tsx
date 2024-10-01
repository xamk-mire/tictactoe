import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    console.log(nextSquares, currentMove);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(history);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li className="step step-primary" key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  // <ol>{moves}</ol>
  return (
    <div className="flex justify-center items-center h-screen bg-base-200 space-x-4">
      <div className="card shadow-xl p-6 bg-base-100 w-96">
        <div className="card-body">
          <h1 className="card-title text-center text-3xl font-bold">
            Tic-Tac-Toe
          </h1>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
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
