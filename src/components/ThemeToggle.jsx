import { Moon, Sun } from "lucide-react";

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={24} className="text-gray-700" />
      ) : (
        <Sun size={24} className="text-yellow-400" />
      )}
    </button>
  );
}

export default ThemeToggle;
