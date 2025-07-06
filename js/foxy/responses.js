// js/foxy/responses.js

export const services = {
  "комби маникюр":        "Снятие + комби-маникюр — 1000₽.",
  "маникюр с покрытием":  "Снятие + комби + укрепление + дизайн — от 1700₽.",
  "коррекция длины":       "Коррекция длины и формы — от 2100₽.",
  "наращивание ногтей":    "Наращивание + оформление — от 3000₽.",
  "снятие покрытия":       "Снятие без дальнейшего покрытия — 500₽."
};

export function matchService(message) {
  const input = message.trim().toLowerCase();

  // 1) Точное совпадение ключа
  for (const key of Object.keys(services)) {
    if (input === key) {
      return { name: key, exact: true };
    }
  }
  // 2) Частичное по первому слову
  for (const key of Object.keys(services)) {
    const base = key.split(" ")[0];
    if (input.includes(base)) {
      return { name: key, exact: false };
    }
  }
  return null;
}

export function emoji(mood = "neutral") {
  return "🦊";
}

export function randomReply(type) {
  const replies = {
    greeting: [
      "Приветик! Что интересует сегодня — нюд, блёстки или кошачий глаз? 😘",
      "Салют! Давай выберем что-то стильное вместе 🌈"
    ],
    mood: [
      "Спасибо, что спросил(а)! У меня всё отлично 💅",
      "Настроение — как свежий маникюр ✨"
    ],
    thanks: ["Пожалуйста 😊", "Обращайся в любое время 🌸"],
    bye: ["До встречи! Не забывай баловать себя ✨", "Пока-пока! Буду ждать 💖"],
    design: ["Для вдохновения дизайном ногтей загляни сюда: Pinterest — дизайн от Фокси"],
    fallback: [
      "Что-то не уловила... Можешь повторить по-другому?",
      "Не совсем поняла… Попробуй переформулировать 🙈"
    ],
    softWarning: ["Попробуем обойтись без грубостей, ладно? 🧼", "Эй! Давай по-доброму 😇"],
    smalltalkLite: ["Может, посмотрим другие варианты?", "Хочешь, покажу новинки сезона?"],
    styleTalk: ["О, нюд — всегда в моде! 💅", "Блёстки добавят огня 🔥", "«Кошачий глаз» — шикарный выбор 😻"],
    about: ["Я — твой маникюрный гид! Помогу выбрать и записать ✨"]
  };
  const list = replies[type] || replies.fallback;
  return list[Math.floor(Math.random() * list.length)];
}
