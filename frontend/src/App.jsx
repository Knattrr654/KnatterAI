import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <h1 className="text-4xl font-bold mb-6">Willkommen bei KnatterAI</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        {darkMode ? 'Wechsel zu Light Mode' : 'Wechsel zu Dark Mode'}
      </button>
    </div>
  );
}

export default App;
