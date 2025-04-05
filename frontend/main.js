// main.js
document.addEventListener('DOMContentLoaded', function () {
  const app = document.getElementById('app');
  
  // Einfacher Inhalt, der in #app angezeigt wird
  app.innerHTML = "<h1>Willkommen bei KnatterAI!</h1>";
});
// main.js
document.addEventListener('DOMContentLoaded', function () {
  const app = document.getElementById('app');
  const toggleButton = document.getElementById('toggle-theme');

  // Setze den initialen Text
  app.innerHTML = "<h1>Willkommen bei KnatterAI!</h1>";

  // Überprüfe und setze den bevorzugten Modus aus dem LocalStorage
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }

  // Event Listener für den Button
  toggleButton.addEventListener('click', function () {
    // Toggle zwischen den Modus-Klassen
    document.body.classList.toggle('light-mode');
    
    // Speichern des gewählten Modus im LocalStorage
    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
});
