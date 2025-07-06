// js/foxy/dom.js

/**
 * Возвращает контейнер для сообщений
 */
export function getChat() {
  return document.getElementById("pseudo-chat");
}

/**
 * Возвращает контейнер для кнопок-реакций
 */
export function getReactions() {
  return document.getElementById("pseudo-reactions");
}

/**
 * Добавляет в чат новое сообщение.
 * @param {string} text — текст сообщения (или HTML, если isHTML=true)
 * @param {boolean} [isHTML=false] — вставлять как HTML (true) или как textContent (false)
 */
export function addMessage(text, isHTML = false) {
  const chat = getChat();
  if (!chat) return;

  const bubble = document.createElement("div");
  bubble.className = "bg-white p-2 rounded-xl text-sm shadow whitespace-pre-line foxy-fade-in";

  if (isHTML) {
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }

  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}


/**
 * Очищает контейнер с кнопками (реакциями)
 */
export function clearButtons() {
  const reactions = getReactions();
  if (!reactions) return;
  reactions.innerHTML = "";
}
export function renderReactions(options = []) {
  const reactions = getReactions();
  if (!reactions) return;
  reactions.innerHTML = "";
  for (const opt of options) {
    const btn = document.createElement("button");
    btn.className = "ai-btn";
    btn.textContent = opt.text;
    btn.addEventListener("click", opt.callback);
    reactions.appendChild(btn);
  }
}
