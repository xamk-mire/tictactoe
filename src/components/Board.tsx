import Square from './Square';

// Props model for board
type BoardProps = {
  // Current gameboard squares
  squares: (string | null)[];
  // Callback function to handle play events
  onPlay: (index: number) => void;
};

export default function Board({ squares, onPlay }: BoardProps) {
  // Handle click events on gamboard squares
  function handleClick(index: number) {
    // Call the callback function
    onPlay(index);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
