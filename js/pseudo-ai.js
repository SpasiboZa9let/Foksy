document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("pseudo-ai-wrapper");
  if (!wrapper) return;

  try {
    const res = await fetch("pseudo-ai.html");
    const html = await res.text();
    wrapper.innerHTML = html;

    requestAnimationFrame(() => {
      const chatbox = document.getElementById("pseudo-chat");
      const form = document.getElementById("pseudo-form");
      const input = document.getElementById("pseudo-input");

      if (!chatbox || !form || !input) return;

      const addMessage = (text, from = "user") => {
        const bubble = document.createElement("div");
        bubble.className = `mb-2 px-4 py-2 rounded-xl text-sm ${
          from === "user" ? "bg-pink-100 self-end text-right" : "bg-white text-left"
        }`;
        bubble.textContent = text;
        chatbox.appendChild(bubble);
        chatbox.scrollTop = chatbox.scrollHeight;
      };

      const respond = (msg) => {
        const norm = msg.toLowerCase();
        let answer = "Уточните, пожалуйста, какую услугу вы ищете?";

        if (norm.includes("укрепление")) answer = "Услуга 'Маникюр с покрытием' включает укрепление, дизайн и стоит 2000₽.";
        else if (norm.includes("снять") || norm.includes("снятие")) answer = "Снятие без дальнейшего покрытия — 500₽.";
        else if (norm.includes("нарастить")) answer = "Полное наращивание с индивидуальным дизайном — 3000₽.";
        else if (norm.includes("коррекц")) answer = "Коррекция длины с дизайном — 2500₽.";
        else if (norm.includes("комби")) answer = "Комби-маникюр с снятием — 1200₽.";

        setTimeout(() => addMessage(answer, "ai"), 600);
      };

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (!msg) return;
        addMessage(msg, "user");
        input.value = "";
        respond(msg);
      });
    });

  } catch (err) {
    console.error("Не удалось загрузить pseudo-ai.html:", err);
  }
});
