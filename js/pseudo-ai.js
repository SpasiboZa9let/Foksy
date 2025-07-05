document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("pseudo-ai-wrapper");
  if (!wrapper) return;

  // Подгружаем HTML-шаблон
  const res = await fetch("pseudo-ai.html");
  const html = await res.text();
  wrapper.innerHTML = html;

  const chat = wrapper.querySelector("#pseudo-chat");
  const input = wrapper.querySelector("#pseudo-input");
  const form = wrapper.querySelector("#pseudo-form");

  const steps = [
    "Какую услугу вы хотите узнать?", // step 0
    "Нужна ли коррекция или наращивание?", // step 1
    "Хотите включить дизайн (френч, втирка, стразы)?" // step 2
  ];

  let currentStep = 0;
  let context = {};

  const sendMessage = (text, sender = "user") => {
    const msg = document.createElement("div");
    msg.className = `rounded-xl px-4 py-2 mb-2 text-sm ${sender === "user" ? "bg-pink-100 self-end" : "bg-white"}`;
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const respond = async (userInput) => {
    const msg = userInput.toLowerCase();

    if (currentStep === 0) {
      context.service = msg;
      if (msg.includes("снятие")) {
        sendMessage("Снятие без дальнейшего покрытия — 500₽.", "ai");
        return;
      }
      if (msg.includes("наращивание")) {
        sendMessage("Наращивание ногтей с дизайном — 3000₽.", "ai");
        return;
      }
      if (msg.includes("коррекция")) {
        sendMessage("Коррекция длины с дизайном — 2500₽.", "ai");
        return;
      }
      currentStep++;
      await delay(400);
      sendMessage(steps[currentStep], "ai");
    } else if (currentStep === 1) {
      context.extra = msg;
      currentStep++;
      await delay(400);
      sendMessage(steps[currentStep], "ai");
    } else if (currentStep === 2) {
      context.design = msg;
      await delay(400);
      sendMessage("Вам подойдёт маникюр с покрытием — 2000₽.", "ai");
    }
  };

  // AI стартует сам
  await delay(300);
  sendMessage(steps[currentStep], "ai");

  // Обработка формы
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    sendMessage(text, "user");
    input.value = "";
    await respond(text);
  });
});
