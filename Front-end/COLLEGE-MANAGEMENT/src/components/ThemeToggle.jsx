import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-full
        bg-gray-100 dark:bg-gray-800
        text-gray-700 dark:text-yellow-300
        border border-gray-200 dark:border-gray-700
        shadow-sm
        hover:scale-105
        transition-all duration-300
      "
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;