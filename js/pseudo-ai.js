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

  function addMessage(text) {
    const bubble = document.createElement("div");
    bubble.className = "bg-white p-2 rounded-xl text-sm shadow";
    bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  function addFollowupButtons() {
    const container = document.createElement("div");
    container.className = "flex gap-2 mt-2";

    const btn1 = document.createElement("button");
    btn1.textContent = "👍 Подходит";
    btn1.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    btn1.onclick = () => addMessage("🦊 Отлично! Обращайтесь в любое время.");

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

  function addInlineConfirmButtons() {
    const container = document.createElement("div");
    container.className = "flex gap-2 mt-2";

    const btnYes = document.createElement("button");
    btnYes.textContent = "👍 Да";
    btnYes.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    btnYes.onclick = () => {
      addMessage("Вы: Да");
      addMessage(`🦊 ${services[pendingService]}\nЗапишем вас?`);
      addFollowupButtons();
      pendingService = null;
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

  function showServiceList() {
    addMessage("🦊 Вот список доступных услуг:");

    const listContainer = document.createElement("div");
    listContainer.className = "flex flex-wrap gap-2 mt-2";

    Object.keys(services).forEach((service) => {
      const btn = document.createElement("button");
      btn.textContent = capitalize(service);
      btn.className = "bg-pink-100 text-pink-700 px-3 py-1 rounded-xl text-sm border";
      btn.onclick = () => {
        input.value = service;
        input.focus();
      };
      listContainer.appendChild(btn);
    });

    chat.appendChild(listContainer);
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addMessage("Вы: " + message);
    input.value = "";

    const match = matchService(message);
    if (match) {
      if (match.exact) {
        addMessage(`🦊 ${services[match.name]}\nЗапишем вас?`);
        addFollowupButtons();
      } else {
        pendingService = match.name;
        addMessage(`🦊 Вы имели в виду "${capitalize(match.name)}"?`);
        addInlineConfirmButtons();
      }
    } else {
      addMessage("🦊 Уточните, пожалуйста, что вас интересует.");
      showServiceList();
    }
  });

  // Приветствие
  addMessage("🦊 Привет, я Фокси. Спроси что-нибудь!");
});
