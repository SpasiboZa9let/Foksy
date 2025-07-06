// подключаем обработчик
import { handleUserInput } from "./foxy/handlers.js";
import { addMessage, chat } from "./foxy/dom.js";
import { emoji }            from "./foxy/personality.js";

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
    if (chat.childElementCount === 0) {
      addMessage(`${emoji} Привет, я Фокси. Спроси что-нибудь!`);
      setTimeout(() => {
        addMessage(
          `${emoji} Я могу:\n💅 рассказать про услуги\n💬 помочь выбрать дизайн\n📅 записать тебя`
        );
      }, 800);
    }
  }, 200);
});
