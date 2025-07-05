document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("pseudo-container");
  const reactions = document.getElementById("pseudo-reactions");

  if (!container) return;

  const input = document.createElement("input");
  input.placeholder = "Задайте вопрос об услуге...";
  input.className = "w-full mt-2 p-2 rounded border text-sm";
  container.appendChild(input);

  const log = document.createElement("div");
  log.className = "mt-4 space-y-2 text-sm";
  container.appendChild(log);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const pseudoResponse = async (text) => {
    const lower = text.toLowerCase();
    await delay(600); // эффект "печатает..."

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
    log.appendChild(div);
    return div;
  };

  const showResponse = async (question) => {
    const q = document.createElement("div");
    q.className = "font-medium text-gray-800";
    q.textContent = question;
    log.appendChild(q);

    const typing = showTyping();

    const answer = await pseudoResponse(question);

    await delay(800);
    typing.remove();

    const a = document.createElement("div");
    a.className = "text-gray-700";
    a.textContent = answer;
    log.appendChild(a);

    // Reactions
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
  };

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim()) {
      showResponse(input.value.trim());
      input.value = "";
    }
  });
});
