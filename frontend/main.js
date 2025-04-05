document.addEventListener('DOMContentLoaded', function () {
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const messages = document.getElementById('messages');

  // Wenn der Benutzer die Nachricht absendet
  sendButton.addEventListener('click', function () {
    const userMessage = userInput.value.trim();

    if (userMessage !== "") {
      // Zeige die Benutzer-Nachricht im Chat an
      appendMessage("Du", userMessage);

      // Leere das Eingabefeld
      userInput.value =20 "";

      // Hier könnte ein API-Aufruf zur KI (z.B. GPT-3) kommen
      // Füge eine künstliche Antwort hinzu
      setTimeout(() => {
        const botReply = getBotResponse(userMessage);
        appendMessage("KnatterAI", botReply);
      }, 1000); // Verzögerung für die Bot-Antwort
    }
  });

  // Hilfsfunktion zum Hinzufügen von Nachrichten
  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === "Du" ? "user-message" : "bot-message");
    messageDiv.textContent = `${sender}: ${text}`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight; // Automatisches Scrollen
  }

  // Eine einfache Antwort-Logik des Bots (für's Beispiel)
  function getBotResponse(userMessage) {
    if (userMessage.includes("Hallo")) {
      return "Hallo! Wie kann ich dir helfen?";
    } else if (userMessage.includes("Wie gehts")) {
      return "Mir geht's gut, danke der Nachfrage!";
    } else {
      return "Ich habe das leider nicht verstanden. Kannst du das nochmal anders formulieren?";
    }
  }
});
