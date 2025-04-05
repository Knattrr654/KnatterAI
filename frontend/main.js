document.addEventListener('DOMContentLoaded', function () {
  // Variablen
  const sendMessageButton = document.getElementById('send-message'); // Senden Button
  const chatHistory = document.getElementById('chat-history'); // Bereich, der Nachrichten anzeigt
  const userMessage = document.getElementById('user-message'); // Eingabefeld für die Nachricht
  const chatTabsButton = document.getElementById('show-chats-button'); // Button zum Anzeigen der Chats
  const chatTabsContainer = document.getElementById('chat-tabs-container'); // Container für die Chats
  
  // Chat 1, 2, 3 Nachrichten-Verläufe
  const chats = {
    'Chat 1': [],
    'Chat 2': [],
    'Chat 3': []
  };
  
  let currentChat = 'Chat 1'; // Standardmäßig Chat 1 aktiv

  // Setze den initialen Text für den Chat
  chatHistory.innerHTML = "<p>Willkommen im Chat! Schreibe eine Nachricht...</p>";

  // Nachricht senden
  sendMessageButton.addEventListener('click', function () {
    if (userMessage.value.trim() !== "") {
      // Nachricht in den aktuellen Chatverlauf einfügen
      chats[currentChat].push(`Du: ${userMessage.value}`);
      // Chatverlauf aktualisieren
      updateChatHistory();
      userMessage.value = ""; // Textfeld zurücksetzen
      chatHistory.scrollTop = chatHistory.scrollHeight; // Automatisch nach unten scrollen
    }
  });

  // Zeige die Chat-Tabs an, wenn der Button geklickt wird
  chatTabsButton.addEventListener('click', function () {
    chatTabsContainer.classList.toggle('show');
  });

  // Wechseln zwischen den Chats
  function updateChatHistory() {
    chatHistory.innerHTML = chats[currentChat].map(msg => `<p>${msg}</p>`).join('');
  }

  const chatTabs = document.querySelectorAll('.chat-tab');
  chatTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Alle Tabs auf inaktiv setzen
      chatTabs.forEach(t => t.classList.remove('active'));
      // Aktuellen Tab aktiv setzen
      tab.classList.add('active');
      currentChat = tab.textContent;
      updateChatHistory();
    });
  });
});
