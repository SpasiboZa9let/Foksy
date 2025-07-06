// общие DOM-утилиты: куда втыкаем чат и реакции
export const chat = document.getElementById("pseudo-chat");
export const reactions = document.getElementById("pseudo-reactions");

export function addMessage(text, isHTML = false) {
  if (!chat) return;
  const bubble = document.createElement("div");
  bubble.className = "bg-white p-2 rounded-xl text-sm shadow whitespace-pre-line";
  if (isHTML) bubble.innerHTML = text;
  else        bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

export function clearButtons() {
  if (!reactions) return;
  reactions.innerHTML = "";
}
