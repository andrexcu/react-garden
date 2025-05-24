import { useEffect, useState } from "react";

type Move = {
  index: number;
  move: "X" | "O";
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

const Tictactoe = () => {
  const [xo, setXo] = useState<Move[]>([]);
  const [currentMove, setCurrentMove] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | null>(null);
  const [winningIndices, setWinningIndices] = useState<number[] | null>(null);

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
  return (
    <div>
      <div className="transition ease-in-out duration-300 h-8 mb-8 text-xl font-bold text-center">
        {!draw ? winner ? `${winner} wins!` : "": "Draw!"}
      </div>
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
              onClick={() => putXo(i)}
              key={i}
              className={`
              ${removeBorder}
              ${winningIndices?.includes(i) ? "bg-green-400" : ""}
              ${winner !== null && !winningIndices?.includes(i) && "opacity-45"}
              transition ease-in-out duration-300
              flex items-center justify-center
              border-2 p-8 text-5xl cursor-pointer
             `}
            >
              {(cell && (
                <span className="transition ease-in-out duration-300">
                  {cell.move}
                </span>
              )) || <span className="opacity-0 ">X</span>}
            </div>
          );
        })}
      </div>
      {/* <button></button> */}
    </div>
  );
};

export default Tictactoe;
