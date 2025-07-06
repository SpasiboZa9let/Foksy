import { handleUserInput } from "./foxy/handlers.js";
import { addMessage }      from "./foxy/dom.js";
import { emoji }           from "./foxy/personality.js";

// 🎲 Случайный выбор приветствия
const greetings = [
  `Приветик, красотка! 💖 Давай выберем что-то стильное — нюд, блёстки или что-то вау?`,
  `Салют! Я Фокси — твоя подружка в мире маникюра 💅 Спрашивай всё, что хочешь!`,
  `Привет! Готова сделать твои ногти идеальными? 💫 Я помогу ✨`,
  `Хэй, рада тебя видеть! 💖 Что выберем сегодня: нюд или блестящий космос?`,
  `Добро пожаловать, любимка! 😘 Маникюр мечты уже рядом — спроси меня о чём угодно`
];

function randomGreeting() {
  const index = Math.floor(Math.random() * greetings.length);
  return greetings[index];
}

window.addEventListener("DOMContentLoaded", () => {
  // 1) Случайное приветствие
  addMessage(`<strong>${emoji} Фокси:</strong> ${randomGreeting()}`, true);

  // 2) Список возможностей
  addMessage(
    `<ul class="list-disc list-inside text-sm">
       <li>Узнать список услуг</li>
       <li>Помочь выбрать дизайн</li>
       <li>Записаться на процедуру</li>
     </ul>`,
    true
  );

  // 3) Навешиваем отправку формы
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
