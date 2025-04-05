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

      // Sende an KI (OpenAI)
      setTimeout(() => {
        getBotResponse(userMessage).then(botReply => {
          appendMessage("KnatterAI", botReply);
        });
      }, 1000);

      userInput.value =21 "";
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

  // KI-Antwort (GPT-3 API Integration)
  async function getBotResponse(userMessage) {
    const OPENAI_API_KEY = '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'; // Setze hier deinen echten OpenAI API-Schlüssel ein!

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${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}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003', // Du kannst das Modell anpassen, z.B. gpt-3.5-turbo
        prompt: userMessage,
        max_tokens: 654,
      }),
    });

    // Antwort von GPT
    const data = await response.json();
    return data.choices[0].text.trim(); // Antwort von GPT
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
