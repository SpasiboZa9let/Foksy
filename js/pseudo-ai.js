document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pseudo-container");

  const questions = [
    {
      q: "Нужно покрытие или просто маникюр?",
      a: [
        { text: "Покрытие", next: 1 },
        { text: "Без покрытия", result: "Снятие покрытия — 500₽" }
      ]
    },
    {
      q: "Хочется сохранить длину или нарастить ногти?",
      a: [
        { text: "Сохранить", next: 2 },
        { text: "Нарастить", result: "Наращивание ногтей — 3000₽" }
      ]
    },
    {
      q: "Нужен ли дизайн?",
      a: [
        { text: "Да", result: "Маникюр с покрытием — 2000₽" },
        { text: "Нет", result: "Комби маникюр — 1200₽" }
      ]
    }
  ];

  let current = 0;

  function render(index) {
    const q = questions[index];
    container.innerHTML = `
      <div class="pseudo-q">${q.q}</div>
      ${q.a.map((ans, i) => `<div class="pseudo-btn" data-id="${i}">${ans.text}</div>`).join("")}
    `;

    container.querySelectorAll(".pseudo-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        const answer = q.a[id];

        if (answer.result) {
          container.innerHTML = `<div class="pseudo-result">${answer.result}</div>`;
        } else if (typeof answer.next !== "undefined") {
          render(answer.next);
        }
      });
    });
  }

  render(current);
});
