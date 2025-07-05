document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("pseudo-chat");
  const input = document.getElementById("pseudo-input");
  const form = document.getElementById("pseudo-form");
  const reactions = document.getElementById("pseudo-reactions");

  if (!chat || !input || !form || !reactions) return;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const pseudoResponse = async (text) => {
    const lower = text.toLowerCase();
    await delay(600);

    if (lower.includes("снятие")) {
      return "Снятие без дальнейшего покрытия — 500₽. Хотите записаться?";
    }
    if (lower.includes("коррекц")) {
      return "Коррекция длины с дизайном — 2500₽. Запишем вас?";
    }
    if (lower.includes("наращив")) {
      return "Наращивание с индивидуальным дизайном — 3000₽.";
    }
    if (lower.includes("покрытие") || lower.includes("маникюр")) {
      return "Маникюр с покрытием, укреплением и дизайном — 2000₽. Уточните длину ногтей, если нужно.";
    }
    return "Извините, я не уверена. Попробуйте уточнить вопрос.";
  };

  const showTyping = () => {
    const div = document.createElement("div");
    div.className = "text-gray-500 italic";
    div.textContent = "Печатает...";
    chat.appendChild(div);
    return div;
  };

  const showResponse = async (question) => {
    const q = document.createElement("div");
    q.className = "font-medium text-gray-800";
    q.textContent = question;
    chat.appendChild(q);

    const typing = showTyping();
    const answer = await pseudoResponse(question);
    await delay(800);
    typing.remove();

    const a = document.createElement("div");
    a.className = "text-gray-700";
    a.textContent = answer;
    chat.appendChild(a);

    reactions.innerHTML = "";
    ["👍 Подходит", "❓ Уточнить", "📅 Записаться"].forEach(txt => {
      const btn = document.createElement("button");
      btn.className = "px-3 py-1 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 text-xs";
      btn.textContent = txt;
      btn.onclick = () => {
        input.value = "";
        input.focus();
      };
      reactions.appendChild(btn);
    });

    chat.scrollTop = chat.scrollHeight;
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) {
      showResponse(val);
      input.value = "";
    }
  });
});
