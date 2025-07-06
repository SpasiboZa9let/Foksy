// js/foxy/handlers.js

import { matchIntent } from "./intents.js";
import { services, randomReply, matchService } from "./responses.js";
import { emoji } from "./personality.js";
import { foxyMood, lastInput, setLastInput } from "./state.js";
import { addMessage, clearButtons } from "./dom.js";
import {
  renderServiceList,
  renderBookingOptions
} from "./ui.js";

export function handleUserInput(message) {
  clearButtons();
  const input = message.trim().toLowerCase();

  // Фильтрация повторов
  if (input === lastInput) return;
  setLastInput(input);

  addMessage(`Вы: ${message}`);

  // 1) Попытка распознать услугу (точно или частично)
  const svc = matchService(input);
  if (svc) {
    const response = services[svc.name.toLowerCase().trim()];
    if (response) {
      addMessage(`${emoji(foxyMood)} Вот, что нашла:`);
      addMessage(response);
      renderBookingOptions();
    } else {
      addMessage(`Не нашла информацию об этой услуге 😥`);
    }
    return;
  }

  // 2) Интенты
  const intent = matchIntent(input);
  switch (intent) {
    case "design":
      addMessage(randomReply("design"), true);
      return;
    case "booking":
      renderBookingOptions();
      return;
    case "greeting":
    case "mood":
    case "smalltalk":
    case "smalltalkLite":
    case "thanks":
    case "bye":
    case "softWarning":
    case "styleTalk":
    case "about":
      addMessage(randomReply(intent));
      return;
    case "help":
    case "showServices":
      renderServiceList(handleUserInput);
      return;
    default:
      addMessage(randomReply("fallback"));
      renderServiceList(handleUserInput);
  }
}
