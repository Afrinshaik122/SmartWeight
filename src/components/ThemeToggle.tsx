import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-500 hover:scale-105 group shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute inset-0 w-5 h-5 text-black/70 dark:text-white/70 transition-all duration-700 ease-in-out ${isDarkMode ? 'rotate-180 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'}`} />
        <Moon className={`absolute inset-0 w-5 h-5 text-black/70 dark:text-white/70 transition-all duration-700 ease-in-out ${isDarkMode ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-75'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;