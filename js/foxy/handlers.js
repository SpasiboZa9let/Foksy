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

  // Фильтрация повторов
  if (input === lastInput.toLowerCase()) return;
  setLastInput(message); // сохраняем оригинал

  addMessage(`Вы: ${message}`);

  // Услуга
  const svc = matchService(input);
  if (svc && typeof svc === "object" && "name" in svc) {
    if (svc.exact) {
      addMessage(`${emoji(foxyMood)} ${services[svc.name]}`);
      renderBookingOptions();
    } else {
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

  // Интенты
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
