import { matchIntent } from "./intents.js";
import { services, randomReply, matchService } from "./responses.js";
import { emoji } from "./personality.js";
import { foxyMood } from "./state.js";

import { addMessage, clearButtons } from "./dom.js";
import {
  renderServiceList,
  renderInlineConfirmButtons,
  renderBookingOptions
} from "./ui.js";

export function handleUserInput(message) {
  clearButtons();
  addMessage(`Вы: ${message}`);

  const svc = matchService(message);
  if (svc) {
    if (svc.exact) {
      // 💅 Показываем услугу и сразу опции записи
      addMessage(`${emoji(foxyMood)} ${services[svc.name]}`);
      renderBookingOptions();
    } else {
      // 🤔 Уточнение
      addMessage(`${emoji(foxyMood)} Вы имели в виду «${svc.name}»?`);
      renderInlineConfirmButtons(
        () => {
          addMessage("Отличный выбор! 💖");
          addMessage(services[svc.name]);
          renderBookingOptions();
        },
        () => renderServiceList(handleUserInput)
      );
    }
    return;
  }

  const intent = matchIntent(message.toLowerCase().trim());
  switch (intent) {
    case "design":
      addMessage(randomReply("design"), true);
      break;

    case "booking":
      renderBookingOptions();
      break;

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
      break;

    case "help":
    case "showServices":
      renderServiceList(handleUserInput);
      break;

    default:
      addMessage(randomReply("fallback"));
      renderServiceList(handleUserInput);
  }
}
