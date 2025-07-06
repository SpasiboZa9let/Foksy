// js/foxy/handlers.js

import { matchIntent }            from "./intents.js";
import { services, randomReply, matchService } from "./responses.js";
import { emoji }                  from "./personality.js";
import { foxyMood, lastInput, setLastInput }  from "./state.js";
import { addMessage, clearButtons }           from "./dom.js";
import {
  renderServiceList,
  renderBookingOptions
} from "./ui.js";

export function handleUserInput(message) {
  clearButtons();
  const input = message.trim().toLowerCase();
  if (!input || input === lastInput) return;
  setLastInput(input);

  addMessage(`Вы: ${message}`);

  // 1) Услуга?
  const svc = matchService(input);
  if (svc) {
    const resp = services[svc.name];
    if (resp) {
      addMessage(`${emoji(foxyMood)} ${resp}`);
      renderBookingOptions();
    } else {
      addMessage("Не нашла информацию об этой услуге 😥");
    }
    return;
  }

  // 2) Интент
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
