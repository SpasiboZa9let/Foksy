// js/foxy/handlers.js

import { matchIntent } from "./intents.js";
import { services, randomReply, matchService, emoji } from "./responses.js";
import { lastInput, setLastInput, foxyMood }     from "./state.js";
import { addMessage, clearButtons, getReactions }              from "./dom.js";
import { renderServiceList, renderReactions, renderBookingOptions } from "./ui.js";

export function handleUserInput(message) {
  clearButtons();

  const input = message.trim();
  if (!input || input.toLowerCase() === lastInput) return;
  setLastInput(input.toLowerCase());

  addMessage(`Вы: ${message}`);

  // 1) Услуга?
  const svc = matchService(input);
  if (svc) {
    const text = services[svc.name];
    if (text) {
      addMessage(`${emoji(foxyMood)} ${text}`);
      renderBookingOptions();
    } else {
      addMessage(`${emoji(foxyMood)} Упс… информации по услуге нет 😥`);
    }
    return;
  }

  // 2) Интент
  const intent = matchIntent(input.toLowerCase());
  switch (intent) {
    case "design":
      addMessage(randomReply("design"), true);
      return;
          case "abilities":
      addMessage(`${emoji()} Я умею подбирать дизайн, рассказывать про услуги и помогать с записью на маникюр.`);

      clearButtons();
      const reactions = getReactions();
      if (!reactions) return;

      const options = [
        { text: "💅 Прайс",       handler: () => renderServiceList(handleUserInput) },
        { text: "🎨 Дизайн",      handler: () => addMessage(randomReply("design"), true) },
        { text: "🔥 Что модно",   handler: () => showTrendyOptions() }
      ];

      const wrap = document.createElement("div");
      wrap.className = "flex gap-2 flex-wrap";

      options.forEach(({ text, handler }) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.className = "bg-pink-100 text-pink-700 px-3 py-1 rounded-xl text-sm";
        btn.onclick = handler;
        wrap.appendChild(btn);
      });

      reactions.appendChild(wrap);
      return;

    case "booking":
      renderBookingOptions();
      return;

    case "greeting":
    case "mood":
    case "smalltalkLite":
    case "thanks":
    case "bye":
    case "softWarning":
    case "styleTalk":
    case "about":
      addMessage(randomReply(intent));
      return;
    case "showServices":
    case "help":
      renderServiceList(handleUserInput);
      return;
    default:
      addMessage(randomReply("fallback"));
      renderServiceList(handleUserInput);
  }
}
function showTrendyOptions() {
  addMessage(`${emoji()} Сейчас в моде:`);

  const examples = [
    "🌸 Нюд с минималистичным дизайном",
    "💎 Стразы на одном ногте",
    "🖤 Чёрный глянец + матовый топ",
    "✨ «Кошачий глаз» с градиентом",
    "🎨 Градиентный френч",
    "🧊 Лёд-эффект и текстуры"
  ];

  examples.forEach(style => {
    addMessage(`• ${style}`);
  });

  addMessage("Хочешь, подскажу, что подойдёт под твоё настроение? 😉");
}
