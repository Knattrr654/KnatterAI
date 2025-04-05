document.addEventListener('DOMContentLoaded', function () {
  // Variablen
  const sendMessageButton = document.getElementById('send-message'); // Senden Button
  const userMessage = document.getElementById('user-message'); // Eingabefeld für die Nachricht
  const chatHistory = document.getElementById('chat-history'); // Bereich, der Nachrichten anzeigt
  const chatTabsButton = document.getElementById('show-chats-button'); // Button zum Anzeigen der Chats
  const chatTabsContainer = document.getElementById('chat-tabs-container'); // Container für die Chats
  const createNewChatButton = document.getElementById('create-new-chat'); // Button für neuen Chat
  const chatList = document.getElementById('chat-list'); // Liste der Chats
  
  // Chat-Verläufe (beginnend mit einem Chat)
  let chats = {
    'Chat 1': ['Willkommen im Chat! Schreibe eine Nachricht...']
  };
  let currentChat = 'Chat 1'; // Standardmäßig Chat 1 aktiv
  
  // Initialen Chatverlauf anzeigen
  updateChatHistory();

  // Zeige die Chat-Tabs an, wenn der Button geklickt wird
  chatTabsButton.addEventListener('click', function () {
    chatTabsContainer.classList.toggle('show');
  });

  // Erstelle neuen Chat
  createNewChatButton.addEventListener('click', function () {
    const newChatName = `Chat ${Object.keys(chats).length + 1}`;
    chats[newChatName] = [`Neuer Chat: ${newChatName} gestartet.`]; // Startnachricht hinzufügen
    currentChat = newChatName;

    // Neues Tab hinzufügen
    const newTab = document.createElement('li');
    newTab.textContent = newChatName;
    newTab.classList.add('chat-tab');
    newTab.addEventListener('click', function () {
      currentChat = newChatName;
      updateChatHistory();
      setActiveTab(newTab);
    });

    chatList.appendChild(newTab);
    setActiveTab(newTab); // Setze den neuen Tab als aktiv
    updateChatHistory();
  });

  // Nachrichten senden
  sendMessageButton.addEventListener('click', function () {
    if (userMessage.value.trim() !== "") {
      const userMessageText = `Du: ${userMessage.value}`;
      chats[currentChat].push(userMessageText);
      updateChatHistory();
      userMessage.value = ""; // Textfeld zurücksetzen
      chatHistory.scrollTop = chatHistory.scrollHeight; // Automatisch nach unten scrollen
    }
  });

  // Chatverlauf anzeigen
  function updateChatHistory() {
    chatHistory.innerHTML = chats[currentChat].map(msg => `<p>${msg}</p>`).join('');
  }

  // Aktivieren des aktuell ausgewählten Chat-Tabs
  function setActiveTab(tab) {
    const allTabs = document.querySelectorAll('.chat-tab');
    allTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  }

  // Wechseln zwischen den Chats
  const chatTabs = document.querySelectorAll('.chat-tab');
  chatTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      currentChat = tab.textContent;
      updateChatHistory();
      setActiveTab(tab);
    });
  });
});
