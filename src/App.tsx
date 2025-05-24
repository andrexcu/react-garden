import { Route, Routes } from "react-router-dom";
import "./App.css";
import Tenzies from "./challenges/tenzies/Tenzies";
import Tictactoe from "./challenges/tictactoe/Tictactoe";
import Hangman from "./challenges/hangman/Hangman";

import Header from "@/components/Header";
import Container from "./components/Container";
import { useEffect, useState } from "react";

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("no-transitions");
  }, []);
    useEffect(() => {
    document.documentElement.classList.remove("no-transitions");
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return null;
  }
  return (
    <Container>
      <Header />

      <section className="flex justify-center items-center">
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
      </section>
    </Container>
  );
}

export default App;
