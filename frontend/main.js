document.addEventListener('DOMContentLoaded', function () {
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const fileInput = document.getElementById('file-upload');
  const messages = document.getElementById('messages');
  const newChatButton = document.getElementById('new-chat-button');
  const chatList = document.getElementById('chat-list');

  let chats = [{ id: 1, name: "Chat 1", messages: [] }];
  let activeChatId = 1;

  // Initiale Chat-Nachricht
  appendMessage('KnatterAI', 'Willkommen! Starte ein Gespräch, indem du etwas schreibst.');

  // Nachrichten senden
  sendButton.addEventListener('click', function () {
    const userMessage = userInput.value.trim();

    if (userMessage !== "") {
      appendMessage("Du", userMessage);

      // Sende an KI
      setTimeout(() => {
        const botReply = getBotResponse(userMessage);
        appendMessage("KnatterAI", botReply);
      }, 1000);

      userInput.value = "";
    }

    // Datei-Upload verarbeiten
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileName = file.name;
      const fileType = file.type;

      appendMessage("Du", `Hochgeladene Datei: ${fileName} (${fileType})`);
      processFile(file);

      fileInput.value = "";
    }
  });

  // Neuen Chat starten
  newChatButton.addEventListener('click', function () {
    const newChatId = chats.length + 1;
    const newChatName = `Chat ${newChatId}`;
    chats.push({ id: newChatId, name: newChatName, messages: [] });
    activeChatId = newChatId;
    updateChatList();
    appendMessage('KnatterAI', 'Neuer Chat gestartet!');
  });

  // Funktion, um Nachrichten hinzuzufügen
  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === "Du" ? "user-message" : "bot-message");
    messageDiv.textContent = `${sender}: ${text}`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    saveMessage(sender, text);
  }

  // Speichere die Nachrichten im Chat
  function saveMessage(sender, text) {
    const chat = chats.find(chat => chat.id === activeChatId);
    chat.messages.push({ sender, text });
  }

  // KI-Antwort (beispielhaft)
  function getBotResponse(userMessage) {
    if (userMessage.includes("Hallo")) {
      return "Hallo! Wie kann ich dir helfen?";
    } else if (userMessage.includes("Wie gehts")) {
      return "Mir geht's gut, danke der Nachfrage!";
    } else {
      return "Ich habe das leider nicht verstanden. Kannst du das nochmal anders formulieren?";
    }
  }

  // Verarbeitung von Dateien
  function processFile(file) {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      appendMessage("KnatterAI", "Das Bild wird analysiert...");
    } else if (fileType.startsWith("video/")) {
      appendMessage("KnatterAI", "Das Video wird analysiert...");
    } else if (fileType === "application/pdf") {
      appendMessage("KnatterAI", "Die PDF wird analysiert...");
    } else {
      appendMessage("KnatterAI", "Unbekannter Dateityp.");
    }
  }

  // Update der Chatliste
  function updateChatList() {
    chatList.innerHTML = '';
    chats.forEach(chat => {
      const chatDiv = document.createElement('div');
      chatDiv.textContent = chat.name;
      chatDiv.classList.add('chat-item');
      chatDiv.addEventListener('click', function () {
        activeChatId = chat.id;
        messages.innerHTML = '';
        chat.messages.forEach(msg => appendMessage(msg.sender, msg.text));
      });
      chatList.appendChild(chatDiv);
    });
  }

  updateChatList();
});
