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

  // Отсекаем повтор
  if (input === lastInput.value) return;
  setLastInput(input);

  addMessage(`Вы: ${message}`);

  // Попытка определить услугу
  const svc = matchService(input);
  if (svc) {
    const serviceText = services[svc.name];

    if (svc.exact && serviceText) {
      addMessage(`${emoji(foxyMood)} Вот, что нашла:`);
      addMessage(serviceText);
      renderBookingOptions();
    } else if (!svc.exact && serviceText) {
      addMessage(`${emoji(foxyMood)} Вы имели в виду «${svc.name}»?`);
      renderInlineConfirmButtons(
        () => {
          addMessage("Отличный выбор! 💖");
          addMessage(serviceText);
          renderBookingOptions();
        },
        () => renderServiceList(handleUserInput)
      );
    } else {
      addMessage("Не нашла информацию об этой услуге 😥");
    }
    return;
  }

  // Проверка интентов
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
