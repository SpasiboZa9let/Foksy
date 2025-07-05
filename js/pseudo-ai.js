document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("pseudo-ai");
  if (!wrapper) return;

  const data = {
    снятие: "Снятие без дальнейшего покрытия — 500₽.",
    коррекция: "Коррекция длины с дизайном — 2500₽.",
    наращивание: "Наращивание ногтей — полный комплекс + индивидуальный дизайн — 3000₽.",
    маникюр: "Комби-маникюр — 1200₽.",
    покрытие: "Маникюр с покрытием — 2000₽.",
  };

  const keys = Object.keys(data);

  const createBubble = (text, sender = "bot") => {
    const bubble = document.createElement("div");
    bubble.className = `px-4 py-2 rounded-2xl max-w-xs text-sm my-2 ${
      sender === "bot"
        ? "bg-pink-100 text-gray-800 self-start"
        : "bg-pink-400 text-white self-end"
    }`;
    bubble.textContent = text;
    return bubble;
  };

  const renderOptions = () => {
    const box = document.createElement("div");
    box.className = "flex flex-wrap gap-2 mt-2";
    keys.forEach((key) => {
      const btn = document.createElement("button");
      btn.textContent = key;
      btn.className =
        "px-3 py-1 bg-pink-50 text-pink-500 text-xs rounded-full border border-pink-200 hover:bg-pink-100 transition";
      btn.onclick = () => handleResponse(key);
      box.appendChild(btn);
    });
    return box;
  };

  const askQuestion = () => {
    const msg = createBubble("Какую услугу вы хотите узнать?");
    wrapper.appendChild(msg);
    wrapper.appendChild(renderOptions());
  };

  const handleResponse = (key) => {
    const userMsg = createBubble(key, "user");
    wrapper.appendChild(userMsg);

    setTimeout(() => {
      const answer = createBubble(data[key] || "Пока нет информации об этой услуге.");
      wrapper.appendChild(answer);

      setTimeout(() => {
        askQuestion();
        wrapper.scrollTop = wrapper.scrollHeight;
      }, 1000);
    }, 600);
  };

  wrapper.classList.add("flex", "flex-col", "space-y-2");
  askQuestion();
});
