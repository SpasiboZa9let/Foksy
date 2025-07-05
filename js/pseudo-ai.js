// ===========================
//  pseudo-ai.js (full file)
//  2025‑07‑05
//  — обновлён по запросу: новые цены, Pinterest‑ссылка, двойное открытие «Записаться»,
//    follow‑up при позитивном ответе
// ===========================

/* global document */

// ---------------------------
//   DOM‑элементы
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  const chat  = document.getElementById("pseudo-chat");
  const form  = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");

  // ---------------------------
  //   Справочник услуг + цены
  // ---------------------------

  const services = {
    "комби маникюр":       "Снятие + комби-маникюр — 1000₽.",
    "маникюр с покрытием": "Снятие + комби + укрепление + дизайн — от 1700₽.",
    "коррекция длины":     "Коррекция длины с дизайном — от 2100₽.",
    "наращивание ногтей":  "Полный комплекс + индивидуальный дизайн — 3000₽.",
    "снятие покрытия":     "Снятие без дальнейшего покрытия — 500₽."
  };

  // ---------------------------
  //   Переменные состояния
  // ---------------------------

  let pendingService   = null;  // ожидание подтверждения «Да/Нет»
  let lastIntent       = null;  // последняя выбранная услуга
  let lastResponseType = null;  // категория последнего ответа

  // ---------------------------
  //   Утилиты вывода
  // ---------------------------

  function addMessage (text, isHTML = false) {
    if (!chat) return;
    const bubble = document.createElement("div");
    bubble.className = "bg-white p-2 rounded-xl text-sm shadow whitespace-pre-line";
    bubble[isHTML ? "innerHTML" : "textContent"] = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  function clearButtons () {
    if (!chat) return;
    chat.querySelectorAll("button").forEach(btn => btn.remove());
  }

  // ---------------------------
  //   Follow‑up‑кнопки
  // ---------------------------

  function addFollowupButtons () {
    clearButtons();

    const box = document.createElement("div");
    box.className = "flex gap-2 flex-wrap";

    // 👍 Подходит
    const ok = document.createElement("button");
    ok.textContent = "👍 Подходит";
    ok.className   = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    ok.onclick     = () => addMessage(randomResponse([
      "🦊 Отлично! Обращайтесь в любое время 💅",
      "🦊 Прекрасный выбор — до скорой встречи 💖",
      "🦊 Всё записал. До связи! 🌸"
    ]));

    // ❓ Уточнить
    const ask = document.createElement("button");
    ask.textContent = "❓ Уточнить";
    ask.className   = "bg-yellow-400 text-white px-3 py-1 rounded-xl text-sm";
    ask.onclick     = showServiceList;

    // 📅 Записаться
    const book = document.createElement("button");
    book.textContent = "📅 Записаться";
    book.className   = "bg-pink-500 text-white px-3 py-1 rounded-xl text-sm";
    book.onclick = () => {
      // Расписание DIKIDI
      window.open(
        "https://dikidi.net/1456370?p=2.pi-po-ssm&o=7",
        "_blank"
      );
      // Telegram‑чат
      window.open(
        "https://t.me/foxold_a",
        "_blank"
      );
    };

    box.append(ok, ask, book);
    chat.append(box);
    chat.scrollTop = chat.scrollHeight;
  }

  // ---------------------------
  //   Список услуг (кнопками)
  // ---------------------------

  function showServiceList () {
    clearButtons();
    if (lastResponseType !== "serviceList") {
      addMessage("🦊 Вот список доступных услуг:");
      lastResponseType = "serviceList";
    }

    const box = document.createElement("div");
    box.className = "flex gap-2 flex-wrap";

    Object.keys(services).forEach(key => {
      const btn = document.createElement("button");
      btn.textContent = capitalize(key);
      btn.className   = "bg-gray-200 text-black px-3 py-1 rounded-xl text-sm";
      btn.onclick     = () => handleUserInput(key);
      box.appendChild(btn);
    });

    chat.append(box);
    chat.scrollTop = chat.scrollHeight;
  }

  // ---------------------------
  //   Вопрос «Это то, что нужно?»
  // ---------------------------

  function addInlineConfirmButtons () {
    clearButtons();
    const box = document.createElement("div");
    box.className = "flex gap-2";

    const yes = document.createElement("button");
    yes.textContent = "👍 Да";
    yes.className   = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    yes.onclick     = () => {
      addMessage("Вы: Да");
      addMessage(`🦊 ${services[pendingService]}\nЗапишем вас?`);
      lastIntent     = pendingService;
      pendingService = null;
      addFollowupButtons();
    };

    const no = document.createElement("button");
    no.textContent = "❌ Нет";
    no.className   = "bg-gray-400 text-white px-3 py-1 rounded-xl text-sm";
    no.onclick     = () => {
      addMessage("Вы: Нет");
      addMessage("🦊 Хорошо, давай попробуем снова.");
      showServiceList();
      pendingService = null;
    };

    box.append(yes, no);
    chat.append(box);
    chat.scrollTop = chat.scrollHeight;
  }

  // ---------------------------
  //   Вспомогательные функции
  // ---------------------------

  const capitalize = txt => txt.toLocaleLowerCase().replace(/^./u, ch => ch.toLocaleUpperCase());
  const normalize  = txt => txt.toLowerCase().replace(/[^\w\sа-яё]/gi, "").trim();
  const randomResponse = arr => arr[Math.floor(Math.random() * arr.length)];

  function matchService (txt) {
    txt = normalize(txt);
    for (const key in services) if (normalize(key) === txt) return { exact: true, name: key };
    if (txt.length >= 3) {
      for (const key in services) if (normalize(key).includes(txt) || txt.includes(normalize(key))) return { exact: false, name: key };
    }
    return null;
  }

  // ---------------------------
  //   Главный роутер сообщений
  // ---------------------------

  function handleUserInput (message) {
    addMessage("Вы: " + message);
    const lower = message.toLowerCase().trim();

    // ••• XSS‑/токсичный фильтр •••
    if (/хуй|пизд|бляд|еба|сука|чмо|тупа|пошла/i.test(lower)) {
      addMessage("🦊 Давай по‑доброму — у нас тут красота и уют ✨");
      lastResponseType = "softWarning";
      return;
    }

    // ••• Приветствие •••
    if (/^(привет|здравствуй|хай|добрый день|доброе утро|вечер)/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Привет-привет! Я Фокси 💅 Готова помочь с ноготочками!",
        "🦊 Приветик! Что интересует сегодня — нюд, блёстки или кошачий глаз? 😘",
        "🦊 Салют! Давай выберем что-то стильное вместе 🌈"
      ]));
      lastResponseType = "greeting";
      return;
    }

    // ••• Запись / расписание •••
    if (/(записаться|записаться можно|хочу записаться|есть\s+свобод|есть\s+время|запиши|время|свободн|окно)/i.test(lower)) {
      addMessage(
        "🦊 Можно записаться двумя способами:\n\n" +
        "📅 Через DIKIDI — сам выбираешь удобное время:\n" +
        "👉 <a href=\"https://dikidi.net/1456370?p=2.pi-po-ssm&o=7\" target=\"_blank\" class=\"text-pink-600 underline\">Открыть расписание</a>\n\n" +
        "💬 Или просто напиши мастеру напрямую:\n" +
        "👉 <a href=\"https://t.me/foxold_a\" target=\"_blank\" class=\"text-blue-600 underline\">Связаться в Telegram</a>",
        true
      );
      lastResponseType = "booking";
      return;
    }

    // ••• Позитивная текстовая реакция → follow‑up •••
    if (/^(да|подходит|беру|супер|класс|отлично|хорошо)[.!]?$/i.test(lower)) {
      addFollowupButtons();
      lastResponseType = "positive";
      return;
    }

    // ••• Настроение •••
    if (/как (дела|ты)/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 У меня всё отлично! Только что протестила новый дизайн с лавандой 💜",
        "🦊 Спасибо, что спросил(а)! Настроение — как свежий маникюр ✨",
        "🦊 Всё супер, только кофе опять остыл 😹 А у тебя как день идёт?"
      ]));
      lastResponseType = "mood";
      return;
    }

    // ••• Краткий запрос на запись (ещё одна формулировка) •••
    if (/как.*запис|можно.*запис|запиш|записаться/i.test(lower)) {
      addMessage("🦊 Записаться можно прямо сейчас 💬 Жми кнопку ниже 👇");
      addFollowupButtons();
      lastResponseType = "booking";
      return;
    }

    // ••• Что умеешь? •••
    if (/что.*умеешь|что.*можешь|ты кто|чем.*занимаешься/i.test(lower)) {
      addMessage("🦊 Я могу рассказать про услуги, помочь выбрать дизайн, показать прайс и записать тебя 💅");
      showServiceList();
      lastResponseType = "about";
      return;
    }

    // ••• Примеры дизайна → Pinterest •••
    if (/(пример.*дизайн|дизайн.*пример|помог.*дизайн|помощь.*дизайн)/i.test(lower)) {
      addMessage(
        "🦊 Лови свежие идеи дизайна 👉 " +
        '<a href="https://ru.pinterest.com/foksynails/%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD/?invite_code=be24647141714804b78fe8d043c1d5bf&sender=918171580188790185" ' +
        'target="_blank" class="text-pink-600 underline">смотреть на Pinterest</a>',
        true
      );
      lastResponseType = "designIdeas";
      addFollowupButtons();
      return;
    }

    // ••• Просьба помочь •••
    if (/помоги|нужна помощь|подскажи/i.test(lower)) {
