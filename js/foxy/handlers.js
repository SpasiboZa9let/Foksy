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

let alreadySuggestedBooking = false;

export function handleUserInput(message) {
  clearButtons();
  addMessage(`Вы: ${message}`);
  const msg = message.toLowerCase().trim();

  // Сброс флага записи
  alreadySuggestedBooking = false;

  // 1. Попытка распознать услугу
  const svc = matchService(msg);
  if (svc) {
    if (svc.exact) {
      addMessage(`${emoji(foxyMood)} ${services[svc.name]}`);
      renderBooking();
    } else {
      addMessage(`${emoji(foxyMood)} Вы имели в виду «${svc.name}»?`);
      renderInlineConfirmButtons(
        () => {
          addMessage(randomReply("serviceConfirm"));
          addMessage(`${services[svc.name]}`);
          renderBooking();
        },
        () => renderServiceList(handleUserInput)
      );
    }
    return;
  }

  // 2. Интенты
  const intent = matchIntent(msg);
  switch (intent) {
    case "design":
      addMessage(randomReply("design"), true);
      break;

    case "booking":
      renderBooking();
      break;

    case "about":
      addMessage(randomReply("about"));
      break;

    case "greeting":
    case "mood":
    case "smalltalk":
    case "smalltalkLite":
    case "thanks":
    case "bye":
    case "softWarning":
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

function renderBooking() {
  if (alreadySuggestedBooking) return;
  alreadySuggestedBooking = true;
  addMessage(randomReply("booking"));
  renderBookingOptions();
}
