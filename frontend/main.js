document.addEventListener('DOMContentLoaded', function () {
  // Variablen
  const toggleButton = document.getElementById('toggle-theme'); // Dark/Light Mode Button
  const sendMessageButton = document.getElementById('send-message'); // Senden Button
  const chatHistory = document.getElementById('chat-history'); // Bereich, der Nachrichten anzeigt
  const userMessage = document.getElementById('user-message'); // Eingabefeld für die Nachricht
  const chatTabs = document.querySelectorAll('.chat-tab'); // Alle Chat Tabs
  
  let currentChat = 'Chat 1'; // Standardmäßig Chat 1 aktiv
  
  // Setze den initialen Text, wenn keine Nachrichten da sind
  chatHistory.innerHTML = "<p>Willkommen im Chat! Schreibe eine Nachricht...</p>";
  
  // Dark/Light Mode Umschalter
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }

  toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme); // Speichern des Modus im LocalStorage
  });
  
  // Nachrichten senden
  sendMessageButton.addEventListener('click', function () {
    if (userMessage.value.trim() !== "") {
      const newMessage = document.createElement('p');
      newMessage.textContent = `Du: ${userMessage.value}`;
      chatHistory.appendChild(newMessage); // Neue Nachricht wird hinzugefügt
      userMessage.value = ""; // Textfeld zurücksetzen
      chatHistory.scrollTop = chatHistory.scrollHeight; // Automatisch nach unten scrollen
    }
  });
  
  // Wechseln zwischen den Chats
  chatTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Alle Tabs auf inaktiv setzen
      chatTabs.forEach(t => t.classList.remove('active'));
      // Aktuellen Tab aktiv setzen
      tab.classList.add('active');
      currentChat = tab.textContent;
      chatHistory.innerHTML = `<p>Du hast ${currentChat} ausgewählt. Schreibe eine Nachricht...</p>`; // Nachricht anpassen
    });
  });
});
