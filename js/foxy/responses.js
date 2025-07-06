// js/foxy/responses.js

import { normalize } from "./utils.js";

// 💅 прайс-лист
export const services = {
  "комби маникюр":       "Снятие + комби-маникюр — 1000₽.",
  "маникюр с покрытием": "Снятие + комби + укрепление + дизайн — от 1700₽.",
  "коррекция длины":      "Коррекция длины и формы — 800₽.",
  "наращивание ногтей":   "Наращивание + оформление — от 2200₽.",
  "снятие покрытия":      "Снятие без дальнейшего покрытия — 500₽."
};

// 🔍 поиск услуги по точному или частичному совпадению
export function matchService(text) {
  const input = normalize(text);

  // Исключаем ключевые команды/интенты
  const blocked = ["услуга", "услуги", "дизайн", "помощь", "записаться", "привет"];
  if (blocked.includes(input)) return null;

  // Точное совпадение
  for (const key of Object.keys(services)) {
    if (normalize(key) === input) {
      return { name: key, exact: true };
    }
  }

  // Синонимы
  const aliases = {
    "комби": "комби маникюр",
    "маникюр": "комби маникюр",
    "укрепление": "маникюр с покрытием",
    "покрытие": "маникюр с покрытием",
    "длина": "коррекция длины",
    "длину": "коррекция длины",
    "коррекция": "коррекция длины",
    "нарастить": "наращивание ногтей",
    "наращивание": "наращивание ногтей",
    "снятие": "снятие покрытия",
    "снять": "снятие покрытия"
  };

  if (aliases[input]) {
    return { name: aliases[input], exact: false };
  }

  // Частичное совпадение
  for (const key of Object.keys(services)) {
    const words = normalize(key).split(" ");
    if (words.some(word => input.includes(word))) {
      return { name: key, exact: false };
    }
  }

  return null;
}

// 🦊 простое смайлишько
export function emoji(mood = "neutral") {
  return "🦊";
}

// 💬 шаблоны ответов
export const replies = {
  greeting: [
    "Приветик! Что интересует сегодня — нюд, блёстки или кошачий глаз? 😘",
    "Салют! Давай выберем что-то стильное вместе 🌈"
  ],
  mood: [
    "Спасибо, что спросил(а)! У меня всё отлично 💅",
    "Настроение — как свежий маникюр ✨"
  ],
  thanks: ["Пожалуйста 😊", "Обращайся в любое время 🌸"],
  bye:    ["До встречи! Не забывай баловать себя ✨", "Пока-пока! Буду ждать 💖"],
   design: [
    "Для вдохновения дизайном ногтей загляни сюда: " +
    "<a href=\"https://www.pinterest.com/search/pins/?q=маникюр%20дизайн\" " +
       "target=\"_blank\" rel=\"noopener noreferrer\" " +
       "class=\"text-pink-500 underline\">Pinterest — дизайн от Фокси</a>"
  ],
  fallback: [
    "Не совсем поняла… Давай выберем из списка?",
    "Что-то не уловила… Попробуй переформулировать 🙈"
  ],
  softWarning: ["Попробуем обойтись без грубостей, ладно? 🧼", "Эй! Давай по-доброму 😇"],
  smalltalkLite: ["Окей 😉", "Договорились ✨", "Погнали!"],
  styleTalk: [
    "О, нюд — всегда в моде! 💅",
    "Блёстки добавят огня 🔥 Хочешь примеры?",
    "«Кошачий глаз» — шикарный выбор 😻"
  ],
  about: ["Я — твой маникюрный гид! Помогу выбрать и записаться ✨"]
};

export function randomReply(type) {
  const arr = replies[type] || replies.fallback;
  return arr[Math.floor(Math.random() * arr.length)];
}
