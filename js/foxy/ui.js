import { services } from "./responses.js";
import { emoji } from "./personality.js";
import { capitalize } from "./utils.js";
import { addMessage, clearButtons, getReactions } from "./dom.js";

/**
 * Отрисовать список услуг и кнопки выбора
 */
export function renderServiceList(onClick) {
  clearButtons();
  addMessage(`${emoji} Вот список доступных услуг:`);

  const names = Object.keys(services).map(capitalize);
  addMessage(names.join(", "));

  const reactions = getReactions();
  if (!reactions) return;
  const wr = document.createElement("div");
  wr.className = "flex gap-2 flex-wrap";

  names.forEach(name => {
    const key = name.toLowerCase();
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.className = "bg-gray-200 text-black px-3 py-1 rounded-xl text-sm";
    btn.onclick = () => onClick(key);
    wr.appendChild(btn);
  });

  reactions.appendChild(wr);
}

/**
 * Подтверждение «Вы имели в виду?»
 */
export function renderInlineConfirmButtons(serviceName, onYes, onNo) {
  clearButtons();
  const reactions = getReactions();
  if (!reactions) return;

  const wr = document.createElement("div");
  wr.className = "flex gap-2 flex-wrap";

  const yes = document.createElement("button");
  yes.textContent = "👍 Да";
  yes.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
  yes.onclick = onYes;

  const no = document.createElement("button");
  no.textContent = "❌ Нет";
  no.className = "bg-gray-400 text-white px-3 py-1 rounded-xl text-sm";
  no.onclick = onNo;

  wr.append(yes, no);
  reactions.appendChild(wr);
}

/**
 * Кнопки для записи
 */
export function renderBookingOptions() {
  clearButtons();
  addMessage(`${emoji} Можно записаться двумя способами:`);

  // DIKIDI
  addMessage("📅 Через DIKIDI — сам выбираешь время:");
  const reactions = getReactions();
  if (!reactions) return;
  const dikidiBtn = document.createElement("button");
  dikidiBtn.textContent = "Открыть DIKIDI";
  dikidiBtn.className = "bg-pink-600 text-white px-3 py-1 rounded-xl text-sm";
  dikidiBtn.onclick = () =>
    window.open("https://dikidi.net/1456370?p=2.pi-po-ssm&o=7", "_blank");
  reactions.appendChild(dikidiBtn);

  // Telegram
  addMessage("💬 Или через Telegram:");
  const tgBtn = document.createElement("button");
  tgBtn.textContent = "Связаться в Telegram";
  tgBtn.className = "bg-blue-600 text-white px-3 py-1 rounded-xl text-sm";
  tgBtn.onclick = () => window.open("https://t.me/foxold_a", "_blank");
  reactions.appendChild(tgBtn);
}
