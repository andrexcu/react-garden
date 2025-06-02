import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import winningCombos from "./WinningCombos";
import Advanced from "./Advanced";
import Easy from "./Easy";

type Move = {
  index: number;
  move: "X" | "O";
};

const Tictactoe = () => {
  const [xo, setXo] = useState<Move[]>([]);
  const [currentMove, setCurrentMove] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | null>(null);
  const [winningIndices, setWinningIndices] = useState<number[] | null>(null);
  const [isAIMoving, setIsAIMoving] = useState(false);

  const putXo = (i: number) => {
    if (xo.some((move) => move.index === i) || winner) return;
    setXo((prev) => [...prev, { index: i, move: currentMove }]);
    setCurrentMove((prevMove) => (prevMove === "X" ? "O" : "X"));
  };

  useEffect(() => {
    const board = Array(9).fill(null) as Array<"X" | "O" | null>;
    xo.forEach(({ index, move }) => {
      board[index] = move;
    });

    for (const [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningIndices([a, b, c]);
        break;
      }
    }
  }, [xo]);

  const draw = xo.length === 9 && !winner;
  const newGame = () => {
    setXo([]);
    setCurrentMove("X");
    setWinner(null);
    setWinningIndices(null);
  };

  return (
    <section className="flex flex-row justify-center items-center gap-8">
      {/* <div className="flex flex-col">
        <span>EASY</span>
        <span>ADVANCED</span>
      </div> */}
      <div className=" flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-8 mb-12">
          <span>EASY</span>
          <span>ADVANCED</span>
        </div>
        <Advanced
          xo={xo}
          currentMove={currentMove}
          winner={winner}
          setXo={setXo}
          setCurrentMove={setCurrentMove}
          setIsAIMoving={setIsAIMoving}
        />
        {/* <Easy
        currentMove={currentMove}
        winner={winner}
        xo={xo}
        setXo={setXo}
        setCurrentMove={setCurrentMove}
        setIsAIMoving={setIsAIMoving}
      /> */}
        {/* <div className="transition ease-in-out duration-300 h-8 mb-8 text-xl font-bold text-center">
        {!draw ? (winner ? `${winner} wins!` : "") : "Draw!"}
      </div> */}
        <div className="grid grid-cols-3 w-[350px] h-[350px]">
          {Array.from({ length: 9 }, (_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;

            const removeBorder = [
              row === 0 ? "border-t-0" : "",
              row === 2 ? "border-b-0" : "",
              col === 0 ? "border-l-0" : "",
              col === 2 ? "border-r-0" : "",
            ].join(" ");

            const cell = xo.find((move) => move.index === i);
            return (
              <div
                onClick={() => !isAIMoving && putXo(i)}
                key={i}
                className={`
              ${removeBorder}
              transition ease-in-out duration-300
              flex items-center justify-center
              border-2 border-gray-800 p-8 text-5xl cursor-pointer
             `}
              >
                {(cell && (
                  <span
                    className={`transition ease-in-out duration-300 ${
                      winner !== null && !winningIndices?.includes(i)
                        ? "opacity-35"
                        : "opacity-100"
                    }`}
                  >
                    {cell.move}
                  </span>
                )) || <span className="opacity-0 ">X</span>}
              </div>
            );
          })}
        </div>
        <Button
          className="mt-16 max-w-1/3"
          variant={"outline"}
          onClick={newGame}
        >
          NEW GAME
        </Button>
      </div>
    </section>
  );
};

export default Tictactoe;
