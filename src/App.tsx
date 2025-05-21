import "./App.css";
import { Routes, Route } from "react-router-dom";
import Tictactoe from "./challenges/tictactoe/Tictactoe";

function App() {
  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline text-cyan-700 text-center">
              WELCOME TO MY REACT GARDEN 🌱
            </h1>
          }
        />

        <Route path="/challenges/tictactoe" element={<Tictactoe />} />
      </Routes>
    </main>
  );
}

export default App;
