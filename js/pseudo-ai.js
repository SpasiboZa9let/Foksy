// pseudo-ai.js

const pseudoData = {
  "снятие": "Снятие без дальнейшего покрытия — 500₽. Запишем вас?",
  "коррекция": "Коррекция длины с дизайном — 2500₽. Запишем вас?",
  "маникюр": "Уточните, пожалуйста, какую услугу вы ищете?",
  "покрытие": "Уточните, пожалуйста, какую услугу вы ищете?",
  "наращивание": "Уточните, пожалуйста, какую услугу вы ищете?"
};

const pseudoChat = document.getElementById("pseudo-chat");
const pseudoForm = document.getElementById("pseudo-form");
const pseudoInput = document.getElementById("pseudo-input");

function addMessage(text, from = "bot") {
  const message = document.createElement("div");
  message.className = from === "bot" ? "text-sm bg-pink-100 p-2 rounded-xl self-start" : "text-sm bg-gray-100 p-2 rounded-xl self-end";
  message.textContent = text;
  pseudoChat.appendChild(message);
  pseudoChat.scrollTop = pseudoChat.scrollHeight;
}

function addButtons() {
  const container = document.createElement("div");
  container.className = "flex space-x-2 mt-2";

  const buttons = [
    { label: "👍 Подходит", action: endConversation },
    { label: "❓ Уточнить", action: () => showSuggestions() },
    { label: "📅 Записаться", action: () => window.location.href = "https://t.me/foxold_a" }
  ];

  buttons.forEach(btn => {
    const button = document.createElement("button");
    button.textContent = btn.label;
    button.className = "text-xs bg-white border border-pink-300 text-pink-600 px-2 py-1 rounded-xl hover:bg-pink-50";
    button.onclick = btn.action;
    container.appendChild(button);
  });

  pseudoChat.appendChild(container);
  pseudoChat.scrollTop = pseudoChat.scrollHeight;
}

function endConversation() {
  addMessage("Спасибо за обращение! Обращайтесь ещё ✨");
}

function showSuggestions() {
  const suggestions = [
    "Комби маникюр",
    "Маникюр с покрытием",
    "Коррекция длины",
    "Наращивание ногтей",
    "Снятие покрытия"
  ];
  addMessage("Вот список доступных услуг:");
  suggestions.forEach(item => addMessage("• " + item));
}

pseudoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = pseudoInput.value.trim().toLowerCase();
  if (!input) return;

  addMessage(input, "user");
  pseudoInput.value = "";

  const response = Object.keys(pseudoData).find(key => input.includes(key));
  if (response) {
    addMessage(pseudoData[response]);
    addButtons();
  } else {
    addMessage("Извините, я не уверена. Попробуйте уточнить вопрос.");
  }
});

// Запуск первой фразы
addMessage("Какую услугу вы хотите узнать?");
