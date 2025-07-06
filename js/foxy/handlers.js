// js/foxy/handlers.js
import { matchIntent } from "./intents.js";
import { services, randomReply, matchService } from "./responses.js";
import { emoji }       from "./personality.js";

import { addMessage, clearButtons } from "./dom.js";
import {
  renderServiceList,
  renderInlineConfirmButtons,
  renderFollowupButtons,
  renderBookingOptions
} from "./ui.js";

export function handleUserInput(message) {
  clearButtons();
  addMessage(`Вы: ${message}`);

  // 1. Попытка распознать услугу
  const svc = matchService(message);
  if (svc) {
    if (svc.exact) {
      // точное совпадение — показываем цену и кнопки
      addMessage(`${emoji} ${services[svc.name]}\nЗапишем вас?`);
      renderFollowupButtons(
        () => addMessage(randomReply("serviceExact")),
        () => renderServiceList(handleUserInput),
        () => renderBookingOptions()
      );
    } else {
      // неточное совпадение — уточняем
      addMessage(`${emoji} Вы имели в виду «${svc.name}»?`);
      renderInlineConfirmButtons(
        svc.name,
        () => {
          addMessage(randomReply("serviceConfirm"));
          renderFollowupButtons(
            () => addMessage(randomReply("serviceExact")),
            () => renderServiceList(handleUserInput),
            () => renderBookingOptions()
          );
        },
        () => renderServiceList(handleUserInput)
      );
    }
    return;
  }

  // 2. Интенты
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
    case "thanks":
    case "bye":
    case "softWarning":
      addMessage(randomReply(intent));
      break;

    case "help":
    case "about":
    case "showServices":
      renderServiceList(handleUserInput);
      break;

    default:
      addMessage(randomReply("fallback"));
      renderServiceList(handleUserInput);
  }
}
