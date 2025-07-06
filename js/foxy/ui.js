import { services } from "./responses.js";
import { emoji }    from "./personality.js";
import { capitalize } from "./utils.js";
import { addMessage, clearButtons, reactions } from "./dom.js";

/**
 * Показать список услуг и кнопки
 */
export function renderServiceList(onClick) {
  clearButtons();
  addMessage(`${emoji} Вот список доступных услуг:`);

  const names = Object.keys(services).map(capitalize);
  addMessage(names.join(", "));

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
 * Подтвердить услугу «Да/Нет»
 */
export function renderInlineConfirmButtons(serviceName, onYes, onNo) {
  clearButtons();
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
 * Кнопки «Подходит / Уточнить / Записаться»
 */
export function renderFollowupButtons(onConfirm, onRefine, onBook) {
  clearButtons();
  const wr = document.createElement("div");
  wr.className = "flex gap-2 flex-wrap";

  const btn1 = document.createElement("button");
  btn1.textContent = "👍 Подходит";
  btn1.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
  btn1.onclick = onConfirm;

  const btn2 = document.createElement("button");
  btn2.textContent = "❓ Уточнить";
  btn2.className = "bg-yellow-400 text-white px-3 py-1 rounded-xl text-sm";
  btn2.onclick = onRefine;

  const btn3 = document.createElement("button");
  btn3.textContent = "📅 Записаться";
  btn3.className = "bg-pink-500 text-white px-3 py-1 rounded-xl text-sm";
  btn3.onclick = onBook;

  wr.append(btn1, btn2, btn3);
  reactions.appendChild(wr);
}

/**
 * Варианты записи
 */
export function renderBookingOptions() {
  clearButtons();
  addMessage(`${emoji} Можно записаться двумя способами:`);
  addMessage("📅 Через DIKIDI — сам выбираешь время:");
  const d = document.createElement("button");
  d.textContent = "Открыть DIKIDI";
  d.className = "bg-pink-600 text-white px-3 py-1 rounded-xl text-sm";
  d.onclick = () => window.open(
    "https://dikidi.net/1456370?p=2.pi-po-ssm&o=7",
    "_blank"
  );
  reactions.appendChild(d);

  addMessage("💬 Или через Telegram:");
  const t = document.createElement("button");
  t.textContent = "Связаться в Telegram";
  t.className = "bg-blue-600 text-white px-3 py-1 rounded-xl text-sm";
  t.onclick = () => window.open("https://t.me/foxold_a", "_blank");
  reactions.appendChild(t);
}
