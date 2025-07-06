import { matchIntent } from "./intents.js";
import { services, randomReply, matchService } from "./responses.js";
import { emoji } from "./personality.js";
import { foxyMood, lastInput, setLastInput } from "./state.js";
import { addMessage, clearButtons } from "./dom.js";
import {
  renderServiceList,
  renderInlineConfirmButtons,
  renderBookingOptions
} from "./ui.js";

export function handleUserInput(message) {
  clearButtons();
  const input = message.trim().toLowerCase();

  if (input === lastInput.value) return;
  setLastInput(input);

  addMessage(`Вы: ${message}`);

  const svc = matchService(input);
  if (svc) {
    if (svc.exact) {
      const response = services[svc.name];
      if (response) {
        addMessage(`${emoji(foxyMood)} Вот, что нашла:`);
        addMessage(response);
        renderBookingOptions();
      } else {
        addMessage("Не нашла информацию об этой услуге 😥");
      }
    } else {
      addMessage(`${emoji(foxyMood)} Вы имели в виду «${svc.name}»?`);
      renderInlineConfirmButtons(
        () => {
          const response = services[svc.name];
          if (response) {
            addMessage("Отличный выбор! 💖");
            addMessage(response);
            renderBookingOptions();
          } else {
            addMessage("Уточни, пожалуйста, что именно интересует.");
          }
        },
        () => renderServiceList(handleUserInput)
      );
    }
    return;
  }

  const intent = matchIntent(input);
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
