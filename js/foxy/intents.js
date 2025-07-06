// js/foxy/intents.js

// 1) Шаблоны для интенций
const patterns = {
  design:       /(дизайн|помощь|помоги|выбрать)/i,
  greeting:     /^(привет|здравствуй|хай|добрый день|доброе утро|вечер)/i,
  booking:      /(записаться|записаться можно|хочу записаться|есть\s+свобод|есть\s+время|запиши|время|свободн|окно)/i,
  mood:         /как (дела|ты)/i,
  smalltalk:    /расскажи что[- ]?нибудь/i,
  about:        /(что.*умеешь|что.*можешь|ты кто|чем.*занимаешься)/i,
  help:         /помоги|нужна помощь|подскажи/i,
  showServices: /услуг|что.*делаешь|покажи|есть|предлагаешь/i,
  thanks:       /спасибо|благодар/i,
  bye:          /пока|до свидания|бай|увидимся|чао/i
};

// 2) Функция, которая по тексту возвращает имя интенции или null
export function matchIntent(text) {
  for (const [intent, re] of Object.entries(patterns)) {
    if (re.test(text)) return intent;
  }
  return null;
}

// 3) Старая функция поиска по услугам
export function matchService(text) {
  const normalize = t => t.toLowerCase().replace(/[^\w\sа-яё]/gi, "").trim();
  text = normalize(text);
  for (let key in exports.services) {
    if (normalize(key) === text) return { exact: true, name: key };
  }
  if (text.length >= 3) {
    for (let key in exports.services) {
      if (normalize(key).includes(text) || text.includes(normalize(key))) {
        return { exact: false, name: key };
      }
    }
  }
  return null;
}

