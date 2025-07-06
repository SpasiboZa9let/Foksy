// js/foxy/responses.js
import { pinterestLink, emoji } from "./personality.js";

// 💅 список услуг
export const services = {
  "комби маникюр":        "Снятие + комби-маникюр — 1000₽.",
  "маникюр с покрытием":  "Снятие + комби + укрепление + дизайн — от 1700₽.",
  "коррекция длины":      "Коррекция длины с дизайном — 2100₽.",
  "наращивание ногтей":    "Полный комплекс + индивидуальный дизайн — 3000₽.",
  "снятие покрытия":       "Снятие без дальнейшего покрытия — 500₽."
};

// 💬 шаблоны ответов по категориям
export const replies = {
  greeting: [
    `${emoji} Привет-привет! Я Фокси 💅 Готова помочь с ноготочками!`,
    `${emoji} Приветик! Что интересует сегодня — нюд, блёстки или кошачий глаз? 😘`,
    `${emoji} Салют! Давай выберем что-то стильное вместе 🌈`
  ],
  mood: [
    `${emoji} У меня всё отлично! Только что протестила новый дизайн с лавандой 💜`,
    `${emoji} Спасибо, что спросил(а)! Настроение — как свежий маникюр ✨`
  ],
  smalltalk: [
    `${emoji} Хмм… могу рассказать про летние тренды 💅 Или показать нюд-варианты. Что интересно?`,
    `${emoji} А давай поговорим про дизайн с блёстками? Или хочешь классику?`
  ],
  thanks: [
    `${emoji} Всегда пожалуйста 💖 Надеюсь, скоро увидимся!`,
    `${emoji} Обращайся, я тут 24/7 ☕`
  ],
  bye: [
    `${emoji} Пока-пока! Удачного дня и шикарных ногтей 💖`,
    `${emoji} До скорого, красотка! 💅`
  ],
  softWarning: [
    `${emoji} Давай по-доброму — у нас тут красота и уют ✨`
  ],
  fallback: [
    `${emoji} Не совсем поняла… Давай выберем из списка?`
  ],
  design: [
    () => `${emoji} Для вдохновения дизайном ногтей загляни сюда: ` +
          `<a href="${pinterestLink}" target="_blank" class="text-pink-600 underline">` +
          `Pinterest — дизайн от Фокси</a>`
  ]
};

// 🎲 случайный ответ из выбранной категории
export function randomReply(intent) {
  const arr = replies[intent] || replies.fallback;
  const item = arr[Math.floor(Math.random() * arr.length)];
  return typeof item === "function" ? item() : item;
}

// 🔡 нормализация текста
function normalize(text) {
  return text.toLowerCase().replace(/[^\w\sа-яё]/gi, "").trim();
}

// 🧠 сопоставление пользовательского ввода с услугами
export function matchService(text) {
  text = normalize(text);
  for (let key in services) {
    if (normalize(key) === text) return { exact: true, name: key };
  }
  if (text.length >= 3) {
    for (let key in services) {
      if (normalize(key).includes(text) || text.includes(normalize(key))) {
        return { exact: false, name: key };
      }
    }
  }
  return null;
}
