// js/foxy/intents.js

const patterns = {
  greeting:     [/^привет/i, /^здрав/i],
  bye:          [/^пока/i, /^до свид/i],
  thanks:       [/спасиб/i, /благодар/i],
  mood:         [/как.*дела/i, /как ты/i],
  help:         [/помощ/i, /не знаю/i, /помоги/i],
  showServices: [/услуг/i, /прайс/i],
  booking:      [/запис/i, /свободн.*врем/i, /сдела[тью]/i],
  design:       [/дизайн/i, /пример/i],
  styleTalk:    [/нюд/i, /бл[её]стк/i, /кошачий/i],
  about:        [/кто ты/i, /что ты такое/i],
  softWarning:  [/дура/i, /тупая/i, /хуй/i, /пошла/i],
  smalltalkLite: [/ок/i, /хорошо/i, /ладно/i, /ясно/i],

  // 🆕 Новый intent
  abilities:    [/что ты умеешь/i, /чем.*можешь.*помочь/i, /зачем ты/i, /для чего ты/i]
};

export function matchIntent(input) {
  for (const [intent, regexes] of Object.entries(patterns)) {
    if (regexes.some(r => r.test(input))) return intent;
  }
  return null;
}
