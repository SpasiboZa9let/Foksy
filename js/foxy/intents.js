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
    patterns: [/запис/i, /время/i, /можно ли/i, /поможешь записаться/i]
  },
  {
    name: "bye",
    patterns: [/пока/i, /до встречи/i, /увидим/i]
  },
  {
    name: "mood",
    patterns: [/как дела/i, /как ты/i, /как настроение/i, /что у тебя/i, /чё как/i]
  },
  {
    name: "reaction",
    patterns: [/мда/i, /ок/i, /ясно/i, /понятно/i, /заебись/i]
  },
  {
    name: "help",
    patterns: [/помощ/i, /подскажи/i, /выбрать/i]
  },
  {
    name: "showServices",
    patterns: [/услуг/i, /прайс/i, /цены/i, /расскажи.*услуг/i]
  },
  {
    name: "softWarning",
    patterns: [/хуй|пизд|ебат|дура|тупа|нах|идиот/i]
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
  }
];

export function matchIntent(text) {
  for (const intent of intents) {
    if (intent.patterns.some(p => p.test(text))) {
      return intent.name;
    }
  }
}
