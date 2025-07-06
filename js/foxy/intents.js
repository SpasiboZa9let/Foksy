const intentMap = [
  { intent: "greeting",     keywords: ["привет", "здравствуй", "хай"] },
  { intent: "bye",          keywords: ["пока", "до встречи"] },
  { intent: "thanks",       keywords: ["спасибо", "благодарю", "спасиб"] },
  { intent: "design",       keywords: ["дизайн", "пример", "вдохновение"] },
  { intent: "booking",      keywords: ["запис", "хочу записаться", "запиши", "бронь"] },
  { intent: "showServices", keywords: ["услуги", "прайс", "что есть", "расскажи про услуги"] },
  { intent: "help",         keywords: ["помоги", "нужна помощь"] },
  { intent: "mood",         keywords: ["как дела", "настроение", "как ты"] },
  { intent: "softWarning",  keywords: ["хуй", "пизд", "сука", "бляд", "дура"] },
  { intent: "smalltalkLite", keywords: ["мда", "ок", "ну", "ясно", "ага"] },
  { intent: "styleTalk",     keywords: ["нюд", "блестк", "кошачий глаз"] },
  { intent: "about",         keywords: ["кто ты", "что ты", "зачем ты"] }
];

export function matchIntent(message) {
  const lower = message.toLowerCase();
  for (const { intent, keywords } of intentMap) {
    if (keywords.some(k => lower.includes(k))) {
      return intent;
    }
  }
  return null;
}
