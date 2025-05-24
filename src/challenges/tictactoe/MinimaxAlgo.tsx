import winningCombos from "./WinningCombos";

// functions
const getAvailableMoves = (board: Array<"X" | "O" | null>) =>
  board.map((val, idx) => (val === null ? idx : null)).filter((v) => v !== null) as number[];

const checkWinner = (board: Array<"X" | "O" | null>): "X" | "O" | null => {
  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const isBoardFull = (board: Array<"X" | "O" | null>) => board.every((cell) => cell !== null);

// minimax algo implementation

const minimax = (
  board: Array<"X" | "O" | null>,
  depth: number,
  isMaximizing: boolean
): { score: number; index: number | null } => {
  const winner = checkWinner(board);
  if (winner === "O") return { score: 10 - depth, index: null };
  if (winner === "X") return { score: depth - 10, index: null };
  if (isBoardFull(board)) return { score: 0, index: null };

  const availableMoves = getAvailableMoves(board);

  let bestMove: { score: number; index: number | null } = {
    score: isMaximizing ? -Infinity : Infinity,
    index: null,
  };

  for (const index of availableMoves) {
    board[index] = isMaximizing ? "O" : "X";
    const result = minimax(board, depth + 1, !isMaximizing);
    board[index] = null;

    if (isMaximizing) {
      if (result.score > bestMove.score) {
        bestMove = { score: result.score, index };
      }
    } else {
      if (result.score < bestMove.score) {
        bestMove = { score: result.score, index };
      }
    }
  }

  return bestMove;
};

export default minimax;
