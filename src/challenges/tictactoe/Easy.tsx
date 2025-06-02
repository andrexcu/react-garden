import { useEffect } from "react";

type Move = {
  index: number;
  move: "X" | "O";
};

interface EasyProps {
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

const Easy = ({
  currentMove,
  winner,
  xo,
  setXo,
  setCurrentMove,
  setIsAIMoving,
}: EasyProps) => {
  useEffect(() => {
    const currentPlayer = currentMove;
    const isXTurn = currentPlayer === "X";

    if (!isXTurn && !winner && xo.length < 9) {
      setIsAIMoving(true);
      const timeout = setTimeout(() => {
        const takenIndices = xo.map((m) => m.index);
        const available = Array.from({ length: 9 }, (_, i) => i).filter(
          (i) => !takenIndices.includes(i)
        );

        if (available.length === 0) return;

        const randomIndex =
          available[Math.floor(Math.random() * available.length)];
        setXo((prev) => [...prev, { index: randomIndex, move: "O" }]);
        setCurrentMove("X");
        setIsAIMoving(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [xo, currentMove, winner]);
  return null;
};

export default Easy;
