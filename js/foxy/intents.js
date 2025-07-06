// js/foxy/intents.js

export const intentMap = {
  greeting:     ["привет", "здравствуй", "хай"],
  bye:          ["пока", "увидимся", "чао"],
  thanks:       ["спасибо", "пасиб", "мерси"],
  mood:         ["как дела", "настроение", "что нового"],
  design:       ["дизайн", "вдохновение", "идея"],
  booking:      ["запиши", "записаться", "бронь"],
  showServices: ["услуги", "прайс", "что есть"],
  help:         ["помоги", "подскажи"],
  softWarning:  ["хуй", "сука", "блядь"],
  smalltalkLite:["давай", "ну", "ок"],
  styleTalk:    ["нюд", "блестк", "кошачий глаз"],
  about:        ["кто ты", "что ты умеешь"]
};

export function matchIntent(text) {
  text = text.toLowerCase();
  for (const [intent, keys] of Object.entries(intentMap)) {
    if (keys.some(k => text.includes(k))) return intent;
  }
  return null;
}
