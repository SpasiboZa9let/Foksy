// js/pseudo-ai.js
import { handleUserInput } from "./foxy/handlers.js";
import { addMessage }      from "./foxy/dom.js";
import { emoji }           from "./foxy/personality.js";

window.addEventListener("DOMContentLoaded", () => {
  // 1) Приветствие и сразу список возможностей
  addMessage(`<strong>${emoji} Фокси:</strong> Привет! Я Фокси. Чем могу помочь?`, true);
  addMessage(
    `<ul class="list-disc list-inside text-sm">
       <li>Узнать список услуг</li>
       <li>Помочь выбрать дизайн</li>
       <li>Записаться на процедуру</li>
     </ul>`,
    true
  );

  // 2) Навешиваем отправку формы
  const form  = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");
  if (form && input) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      handleUserInput(text);
      input.value = "";
    });
  }
});
