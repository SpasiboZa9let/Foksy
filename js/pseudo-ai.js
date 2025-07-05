document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("pseudo-ai-wrapper");
  if (!wrapper) return;

  try {
    const res = await fetch("pseudo-ai.html");
    const html = await res.text();

    wrapper.innerHTML = html;

    const chat = document.getElementById("pseudo-ai-chat");
    const input = document.getElementById("pseudo-ai-input");

    const steps = [
      { q: "Какой у вас сегодня повод для маникюра?" },
      { q: "Вам важно, чтобы был дизайн (стразы, френч, втирка)?" },
      { q: "Нужно ли наращивание или достаточно ухода за своими ногтями?" }
    ];

    const responses = [];
    let stepIndex = 0;

    function askNext() {
      if (stepIndex < steps.length) {
        const step = steps[stepIndex];
        chat.innerHTML += `<div class="font-medium">🤖 ${step.q}</div>`;
        input.value = "";
        input.focus();
      } else {
        const result = getRecommendation(responses);
        chat.innerHTML += `<div class="font-medium text-pink-500">✨ Рекомендую: ${result}</div>`;
        input.disabled = true;
      }
    }

    function getRecommendation(responses) {
      const [occasion, wantsDesign, wantsExtension] = responses.map(x => x.toLowerCase());

      if (wantsExtension.includes("наращив")) {
        return "Коррекция длины или Наращивание ногтей — от 2500₽";
      }
      if (wantsDesign.includes("да")) {
        return "Маникюр с покрытием — 2000₽";
      }
      return "Комби маникюр — 1200₽";
    }

    input.addEventListener("keydown", e => {
      if (e.key === "Enter" && input.value.trim()) {
        const answer = input.value.trim();
        chat.innerHTML += `<div class="text-gray-600">👤 ${answer}</div>`;
        responses.push(answer);
        stepIndex++;
        askNext();
      }
    });

    askNext();
  } catch (error) {
    console.error("Не удалось загрузить pseudo-ai.html:", error);
  }
});
