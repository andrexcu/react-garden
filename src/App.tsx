import { Route, Routes } from "react-router-dom";
import "./App.css";
import Tenzies from "./challenges/tenzies/Tenzies";
import Tictactoe from "./challenges/tictactoe/Tictactoe";
import Hangman from "./challenges/hangman/Hangman";

function App() {
  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline text-cyan-700 text-center ">
              WELCOME TO MY REACT GARDEN 🌱
            </h1>
          }
        />
        <Route path="/challenges/tictactoe" element={<Tictactoe />} />
        <Route path="/challenges/tenzies" element={<Tenzies />} />
        <Route path="/challenges/hangman" element={<Hangman />} />
      </Routes>
    </main>
  );
}

export default App;
