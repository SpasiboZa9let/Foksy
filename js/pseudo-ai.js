// js/pseudo-ai.js
import { handleUserInput } from "./handlers.js";
import { addMessage }       from "./dom.js";
import { emoji }            from "./personality.js";
import { foxyMood }         from "./state.js";

window.addEventListener("DOMContentLoaded", () => {
  const form  = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");

  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    handleUserInput(text);
    input.value = "";
  });

  // Первичное приветствие от Фокси
  setTimeout(() => {
    addMessage(
      `<strong>Фокси ${emoji(foxyMood)}:</strong> Привет! Я Фокси. Чем могу помочь?`,
      true
    );
    addMessage(
      `<ul class="list-disc list-inside text-sm">
         <li>Узнать список услуг</li>
         <li>Помочь выбрать дизайн</li>
         <li>Записаться на процедуру</li>
       </ul>`,
      true
    );
  }, 200);
});
