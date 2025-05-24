// import React from "react";
import { useTheme } from "@/lib/theme-provider";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Add class to disable transitions
    document.documentElement.classList.add("disable-transitions");

    // Toggle theme
    setTheme(theme === "dark" ? "light" : "dark");

    // Remove class after short delay to restore transitions
    window.setTimeout(() => {
      document.documentElement.classList.remove("disable-transitions");
    }, 100); // 100ms or less works well
  };

  return (
    <header className="flex justify-end items-center p-4">
      <Button
        onClick={toggleTheme}
        className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-foreground transition-all"
        variant={"ghost"}

      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
};

export default Header;
