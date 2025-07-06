export const intents = [
  {
    name: "greeting",
    patterns: [/^привет/i, /^здравствуй/i, /добрый (день|вечер|утро)/i]
  },
  {
    name: "thanks",
    patterns: [/спасибо/i, /благодарю/i]
  },
  {
    name: "design",
    patterns: [/дизайн/i, /что.*красиво/i, /идеи/i, /вдохнов/i]
  },
  {
    name: "booking",
    patterns: [/запис/i, /время/i, /можно ли/i]
  },
  {
    name: "bye",
    patterns: [/пока/i, /до свидания/i, /увидим/i]
  },
  {
    name: "help",
    patterns: [/что ты умеешь/i, /помощ/i, /подскажи/i, /выбрать/i]
  },
  {
    name: "showServices",
    patterns: [/услуг/i, /прайс/i, /цены/i]
  },
  {
    name: "softWarning",
    patterns: [/хуй|пизд|ебат|дура|тупа|нах|идиот/i]
  },
  {
    name: "smalltalk",
    patterns: [/как дела/i, /всё хорошо/i]
  },
  {
    name: "askAboutFoxy",
    patterns: [
      /что ты умеешь/i,
      /зачем ты/i,
      /кто ты/i,
      /что ты можешь/i,
      /что ты делаешь/i,
      /какая ты/i,
      /зачем нужна/i
    ]
  },
  {
    name: "smalltalkDeep",
    patterns: [
      /как ты/i,
      /что у тебя/i,
      /чем занимаешься/i,
      /как настроение/i
    ]
  }
];

export function matchIntent(text) {
  for (const intent of intents) {
    if (intent.patterns.some(p => p.test(text))) {
      return intent.name;
    }
  }
}
