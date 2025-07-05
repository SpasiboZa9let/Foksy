<script>
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

  function clearButtons() {
    chat.querySelectorAll("button").forEach(btn => btn.remove());
  }

  function addFollowupButtons() {
    clearButtons();
    const container = document.createElement("div");
    container.className = "flex gap-2 flex-wrap";

    const btn1 = document.createElement("button");
    btn1.textContent = "👍 Подходит";
    btn1.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    btn1.onclick = () => addMessage(randomResponse([
      "🦊 Отлично! Обращайтесь в любое время 💅",
      "🦊 Прекрасный выбор — до скорой встречи 💖",
      "🦊 Всё записал. До связи! 🌸"
    ]));

    const btn2 = document.createElement("button");
    btn2.textContent = "❓ Уточнить";
    btn2.className = "bg-yellow-400 text-white px-3 py-1 rounded-xl text-sm";
    btn2.onclick = showServiceList;

    const btn3 = document.createElement("button");
    btn3.textContent = "📅 Записаться";
    btn3.className = "bg-pink-500 text-white px-3 py-1 rounded-xl text-sm";
    btn3.onclick = () => window.location.href = "https://t.me/foxold_a";

    container.append(btn1, btn2, btn3);
    chat.append(container);
    chat.scrollTop = chat.scrollHeight;
  }

  function showServiceList() {
    clearButtons();
    addMessage("🦊 Вот список доступных услуг:");
    const container = document.createElement("div");
    container.className = "flex gap-2 flex-wrap";

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
    clearButtons();
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
      addMessage("🦊 Хорошо, давай попробуем снова.");
      showServiceList();
      pendingService = null;
    };

    container.append(btnYes, btnNo);
    chat.append(container);
    chat.scrollTop = chat.scrollHeight;
  }

  function capitalize(text) {
    return text.toLocaleLowerCase().replace(/^./u, ch => ch.toLocaleUpperCase());
  }

  function normalize(text) {
    return text.toLowerCase().replace(/[^\w\sа-яё]/gi, "").trim();
  }

  function randomResponse(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function matchService(text) {
    text = normalize(text);
    for (let key in services) {
      if (normalize(key) === text) return { exact: true, name: key };
    }
    for (let key in services) {
      if (normalize(key).includes(text) || text.includes(normalize(key))) {
        return { exact: false, name: key };
      }
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
        addMessage(`🦊 Вы имели в виду "${capitalize(match.name)}"?`);
        addInlineConfirmButtons();
      }
    } else {
      if (/спасибо/i.test(message)) {
        addMessage(randomResponse([
          "🦊 Всегда пожалуйста! Надеюсь, скоро увидимся ✨",
          "🦊 Обращайся, рада помочь 🌷"
        ]));
      } else if (/пока|до свидания|бай/i.test(message)) {
        addMessage("🦊 Пока-пока! Удачного дня и шикарных ногтей 💖");
      } else {
        addMessage("🦊 Не совсем поняла... Давай выберем из списка?");
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
</script>
