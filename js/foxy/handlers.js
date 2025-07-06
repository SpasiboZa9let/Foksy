// js/foxy/handlers.js

import { matchIntent } from "./intents.js";
import { services, randomReply, matchService, emoji } from "./responses.js";
import { lastInput, setLastInput, foxyMood }     from "./state.js";
import { addMessage, clearButtons }              from "./dom.js";
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
  renderReactions([
    { text: "💅 Прайс",       callback: () => handleUserInput("прайс") },
    { text: "🎨 Дизайн",      callback: () => handleUserInput("дизайн") },
    { text: "📅 Запись",      callback: () => handleUserInput("записаться") }
  ]);
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
