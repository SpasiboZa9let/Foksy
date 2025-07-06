import { matchIntent } from "./intents.js";
import { services, randomReply, matchService } from "./responses.js";
import { emoji } from "./personality.js";

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
      addMessage(`${emoji} ${services[svc.name]}`);
      renderBookingOptions();
    } else {
      addMessage(`${emoji} Вы имели в виду «${svc.name}»?`);
      renderInlineConfirmButtons(
        svc.name,
        () => {
          addMessage(randomReply("serviceConfirm"));
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
      return;

    case "booking":
      renderBookingOptions();
      return;

    case "greeting":
    case "mood":
    case "reaction":
    case "thanks":
    case "bye":
      addMessage(randomReply(intent));
      return;

    case "askAboutFoxy":
      addMessage(randomReply("askAboutFoxy"));
      return;

    case "softWarning":
      addMessage(randomReply("softWarning"));
      return;

    case "help":
    case "about":
    case "showServices":
      renderServiceList(handleUserInput);
      return;

    default: {
      addMessage(randomReply("fallback"));
      return;
    }
  }
}
