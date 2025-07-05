// === Pseudo-AI script with enhanced Foxy logic ===

document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("pseudo-chat");
  const form = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");

  const services = {
    "комби маникюр": "Снятие + комби-маникюр — 1200₽.",
    "маникюр с покрытием": "Снятие + комби + укрепление + дизайн — 2000₽.",
    "коррекция длины": "Коррекция длины с дизайном — 2500₽.",
    "наращивание ногтей": "Полный комплекс + индивидуальный дизайн — 3000₽.",
    "снятие покрытия": "Снятие без дальнейшего покрытия — 500₽."
  };

  let pendingService = null;
  let lastIntent = null;

  function addMessage(text) {
    const bubble = document.createElement("div");
    bubble.className = "bg-white p-2 rounded-xl text-sm shadow whitespace-pre-line";
    bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  function addFollowupButtons() {
    const container = document.createElement("div");
    container.className = "flex gap-2 flex-wrap";

    const btn1 = document.createElement("button");
    btn1.textContent = "👍 Подходит";
    btn1.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    btn1.onclick = () => addMessage("🦊 Отлично! Обращайтесь в любое время 💅");

    const btn2 = document.createElement("button");
    btn2.textContent = "❓ Уточнить";
    btn2.className = "bg-yellow-400 text-white px-3 py-1 rounded-xl text-sm";
    btn2.onclick = showServiceList;

    const btn3 = document.createElement("button");
    btn3.textContent = "📅 Записаться";
    btn3.className = "bg-pink-500 text-white px-3 py-1 rounded-xl text-sm";
    btn3.onclick = () => {
      window.location.href = "https://t.me/foxold_a";
    };

    container.append(btn1, btn2, btn3);
    chat.append(container);
    chat.scrollTop = chat.scrollHeight;
  }

  function showServiceList() {
    const container = document.createElement("div");
    container.className = "flex gap-2 flex-wrap";
    addMessage("🦊 Вот список доступных услуг:");

    Object.keys(services).forEach((key) => {
      const btn = document.createElement("button");
      btn.textContent = capitalize(key);
      btn.className = "bg-gray-200 text-black px-3 py-1 rounded-xl text-sm";
      btn.onclick = () => handleUserInput(key);
      container.appendChild(btn);
    });

    chat.append(container);
    chat.scrollTop = chat.scrollHeight;
  }

  function addInlineConfirmButtons() {
    const container = document.createElement("div");
    container.className = "flex gap-2";

    const btnYes = document.createElement("button");
    btnYes.textContent = "👍 Да";
    btnYes.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    btnYes.onclick = () => {
      addMessage("Вы: Да");
      addMessage(`🦊 ${services[pendingService]}\nЗапишем вас?`);
      lastIntent = pendingService;
      pendingService = null;
      addFollowupButtons();
    };

    const btnNo = document.createElement("button");
    btnNo.textContent = "❌ Нет";
    btnNo.className = "bg-gray-400 text-white px-3 py-1 rounded-xl text-sm";
    btnNo.onclick = () => {
      addMessage("Вы: Нет");
      addMessage("🦊 Уточните, пожалуйста, какую услугу вы ищете.");
      showServiceList();
      pendingService = null;
    };

    container.append(btnYes, btnNo);
    chat.append(container);
    chat.scrollTop = chat.scrollHeight;
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function matchService(text) {
    text = text.toLowerCase();
    for (let name in services) {
      if (text === name) return { exact: true, name };
      if (name.includes(text)) return { exact: false, name };
    }
    return null;
  }

  function handleUserInput(message) {
    addMessage("Вы: " + message);
    const match = matchService(message);

    if (match) {
      if (match.exact) {
        addMessage(`🦊 ${services[match.name]}\nЗапишем вас?`);
        lastIntent = match.name;
        addFollowupButtons();
      } else {
        pendingService = match.name;
        addMessage(`🦊 Вы имели в виду \"${capitalize(match.name)}\"?`);
        addInlineConfirmButtons();
      }
    } else {
      if (/спасибо/i.test(message)) {
        addMessage("🦊 Всегда пожалуйста! Надеюсь, скоро увидимся ✨");
      } else if (/пока|до свидания|бай/i.test(message)) {
        addMessage("🦊 Пока-пока! Удачного дня и шикарных ногтей 💖");
      } else {
        addMessage("🦊 Уточните, пожалуйста, что вы имеете в виду?");
        showServiceList();
      }
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    input.value = "";
    handleUserInput(message);
  });

  // приветствие через таймер (если тишина)
  setTimeout(() => {
    if (chat.childElementCount === 0) {
      addMessage("🦊 Привет, я Фокси. Спроси что-нибудь!");
    }
  }, 1000);
});
