// Props model for square component
type SquareProps = {
  // Squares value X/O or empty
  value: string | null;
  // Callback function to handle game moves
  onSquareClick: () => void;
};

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="btn btn-outline btn-primary w-16 h-16 text-2xl font-bold"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
