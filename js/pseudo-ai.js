// js/pseudo-ai.js
import { handleUserInput } from "./foxy/handlers.js";
import { addMessage, getChat } from "./foxy/dom.js";  // ← здесь getChat, а не chat
import { emoji } from "./foxy/personality.js";

document.addEventListener("DOMContentLoaded", () => {
  const form  = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = "";
    handleUserInput(msg);
  });

  // стартовое приветствие
  setTimeout(() => {
    const chat = getChat();  // ← получаем контейнер динамически
    if (chat && chat.childElementCount === 0) {
      addMessage(`${emoji} Привет, я Фокси. Спроси что-нибудь!`);
      setTimeout(() => {
        addMessage(
          `${emoji} Я могу:\n` +
          `💅 рассказать про услуги\n` +
          `💬 помочь выбрать дизайн\n` +
          `📅 записать тебя`
        );
      }, 800);
    }
  }, 200);
});
