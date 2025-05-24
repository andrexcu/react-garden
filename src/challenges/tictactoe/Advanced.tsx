import { useEffect } from "react";
import minimax from "./MinimaxAlgo";

type Move = {
  index: number;
  move: "X" | "O";
};

interface AdvancedProps {
  index?: number;
  move?: "X" | "O";
  xo: Move[];
  currentMove: "X" | "O";
  winner: "X" | "O" | null;
  setXo: React.Dispatch<React.SetStateAction<Move[]>>;
  setCurrentMove: React.Dispatch<React.SetStateAction<"X" | "O">>;
  isAIMoving?: Boolean;
  setIsAIMoving: React.Dispatch<React.SetStateAction<boolean>>;
}

const Advanced = ({
  xo,
  setXo,
  setCurrentMove,
  currentMove,
  winner,
  setIsAIMoving,
}: AdvancedProps) => {
  useEffect(() => {
    const isXTurn = currentMove === "X";

    if (!isXTurn && !winner && xo.length < 9) {
      setIsAIMoving(true);
      const timeout = setTimeout(() => {
        const board: Array<"X" | "O" | null> = Array(9).fill(null);
        xo.forEach(({ index, move }) => {
          board[index] = move;
        });

        const { index: bestMove } = minimax(board, 0, true);

        if (bestMove !== null) {
          setXo((prev) => [...prev, { index: bestMove, move: "O" }]);
          setCurrentMove("X");
        }
        setIsAIMoving(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [xo, currentMove, winner]);

  return null;
};

export default Advanced;
