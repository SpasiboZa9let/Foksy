// =============================================================
//  pseudo-ai.js  — рабочая и полноразмерная версия (≈330 строк)
//  Дата: 07 июля 2025
//  Изменено: новые цены, двойное «Записаться», Pinterest-ссылка, позитивный ответ
// =============================================================

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // DOM
  // ---------------------------
  const chat  = document.getElementById("pseudo-chat");
  const form  = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");
  if (!chat || !form || !input) return;

  // ---------------------------
  // Справочник услуг (актуальные цены)
  // ---------------------------
  const services = {
    "комби маникюр":       "Снятие + комби-маникюр — 1000₽.",
    "маникюр с покрытием": "Снятие + комби + укрепление (средние ногти) + дизайн — от 1700₽.",
    "коррекция длины":     "Снятие + комби + укрепление средних и длинных ногтей + дизайн — от 2100₽.",
    "наращивание ногтей":  "Полный комплекс + индивидуальный дизайн — 3000₽.",
    "снятие покрытия":     "Снятие без дальнейшего покрытия — 500₽."
  };

  // ---------------------------
  // State
  // ---------------------------
  let pendingService   = null;
  let lastIntent       = null;
  let lastResponseType = null;

  // ---------------------------
  // UI Helpers
  // ---------------------------
  function addMessage(text, isHTML = false) {
    const bubble = document.createElement("div");
    bubble.className = "bg-white p-2 rounded-xl text-sm shadow whitespace-pre-line";
    if (isHTML) bubble.innerHTML = text;
    else bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  function clearButtons() {
    chat.querySelectorAll("button").forEach(btn => btn.remove());
  }

  // ---------------------------
  // Follow-up Buttons
  // ---------------------------
  function addFollowupButtons() {
    clearButtons();
    const box = document.createElement("div");
    box.className = "flex gap-2 flex-wrap";

    // 👍 Подходит
    const ok = document.createElement("button");
    ok.textContent = "👍 Подходит";
    ok.className   = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    ok.onclick = () => addMessage(randomResponse([
      "🦊 Отлично! Обращайтесь в любое время 💅",
      "🦊 Прекрасный выбор — до скорой встречи 💖",
      "🦊 Всё записал. До связи! 🌸"
    ]));

    // ❓ Уточнить
    const ask = document.createElement("button");
    ask.textContent = "❓ Уточнить";
    ask.className   = "bg-yellow-400 text-white px-3 py-1 rounded-xl text-sm";
    ask.onclick = showServiceList;

    // 📅 Записаться (две вкладки)
    const book = document.createElement("button");
    book.textContent = "📅 Записаться";
    book.className   = "bg-pink-500 text-white px-3 py-1 rounded-xl text-sm";
    book.onclick = () => {
      window.open("https://dikidi.net/1456370?p=2.pi-po-ssm&o=7", "_blank");
      window.open("https://t.me/foxold_a", "_blank");
    };

    box.append(ok, ask, book);
    chat.append(box);
    chat.scrollTop = chat.scrollHeight;
  }

  // ---------------------------
  // Service List
  // ---------------------------
  function showServiceList() {
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
  // Inline Confirm Buttons
  // ---------------------------
  function addInlineConfirmButtons() {
    clearButtons();
    const box = document.createElement("div");
    box.className = "flex gap-2";

    const yes = document.createElement("button");
    yes.textContent = "👍 Да";
    yes.className   = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    yes.onclick = () => {
      addMessage("Вы: Да");
      addMessage(`🦊 ${services[pendingService]}\nЗапишем вас?`);
      lastIntent       = pendingService;
      pendingService   = null;
      addFollowupButtons();
    };

    const no = document.createElement("button");
    no.textContent = "❌ Нет";
    no.className   = "bg-gray-400 text-white px-3 py-1 rounded-xl text-sm";
    no.onclick = () => {
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
  // Helpers
  // ---------------------------
  const capitalize = txt => txt.charAt(0).toUpperCase() + txt.slice(1);
  const normalize  = txt => txt.toLowerCase().replace(/[^\w\sа-яё]/gi, "").trim();
  const randomResponse = arr => arr[Math.floor(Math.random() * arr.length)];

  function matchService(txt) {
    const n = normalize(txt);
    for (const key in services) 
      if (normalize(key) === n) return { exact: true, name: key };
    if (n.length >= 3) {
      for (const key in services)
        if (normalize(key).includes(n) || n.includes(normalize(key)))
          return { exact: false, name: key };
    }
    return null;
  }

  // ---------------------------
  // Router
  // ---------------------------
  function handleUserInput(msg) {
    addMessage("Вы: " + msg);
    const lower = msg.toLowerCase().trim();

    // Токсичный фильтр
    if (/хуй|пизд|бляд|еба|сука|чмо|тупа|пошла/i.test(lower)) {
      addMessage("🦊 Давай по‑доброму — у нас тут красота и уют ✨");
      lastResponseType = "softWarning";
      return;
    }

    // Приветствие
    if (/^(привет|здравствуй|хай|добрый день|доброе утро|вечер)/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Привет-привет! Я Фокси 💅 Готова помочь с ноготочками!",
        "🦊 Приветик! Что интересует сегодня — нюд, блёстки или кошачий глаз? 😘",
        "🦊 Салют! Давай выберем что-то стильное вместе 🌈"
      ]));
      lastResponseType = "greeting";
      return;
    }

    // Запись / расписание
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

    // Позитивный ответ
    if (/^(да|подходит|беру|супер|класс|отлично|хорошо)[.!]?$/i.test(lower)) {
      addFollowupButtons();
      lastResponseType = "positive";
      return;
    }

    // Как дела
    if (/как (дела|ты)/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 У меня всё отлично! Только что протестила новый дизайн с лавандой 💜",
        "🦊 Спасибо, что спросил(а)! Настроение — как свежий маникюр ✨",
        "🦊 Всё супер, только кофе опять остыл 😹 А у тебя как день идёт?"
      ]));
      lastResponseType = "mood";
      return;
    }

    // Короткое «как записаться»
    if (/как.*запис|можно.*запис|запиш|записаться/i.test(lower)) {
      addMessage("🦊 Записаться можно прямо сейчас 💬 Жми кнопку ниже 👇");
      addFollowupButtons();
      lastResponseType = "booking";
      return;
    }

    // Что умеешь
    if (/что.*умеешь|что.*можешь|ты кто|чем.*занимаешься/i.test(lower)) {
      addMessage("🦊 Я могу рассказать про услуги, помочь выбрать дизайн, показать прайс и записать тебя 💅");
      showServiceList();
      lastResponseType = "about";
      return;
    }

    // Примеры дизайна / Pinterest
    if (/(пример.*дизайн|дизайн.*пример|помог.*дизайн|помощь.*дизайн)/i.test(lower)) {
      addMessage(
        "🦊 Лови свежие идеи дизайна 👉 " +
        '<a href="https://ru.pinterest.com/foksynails/дизайн/?invite_code=be24647141714804b78fe8d043c1d5bf&sender=918171580188790185" ' +
        'target="_blank" class="text-pink-600 underline">смотреть на Pinterest</a>',
        true
      );
      lastResponseType = "designIdeas";
      addFollowupButtons();
      return;
    }

    // Помощь
    if (/помоги|нужна помощь|подскажи/i.test(lower)) {
      addMessage("🦊 Конечно, я рядом! Могу рассказать про услуги, показать прайс или записать тебя 💅");
      showServiceList();
      lastResponseType = "help";
      return;
    }

    // Smalltalk
    if (/расскажи что[- ]?нибудь/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Хмм… могу рассказать про летние тренды 💅 Или показать варианты нюда. Что интересно?",
        "🦊 А давай поговорим про дизайн с блёстками? Или тебе хочется классику сегодня?",
        "🦊 У меня в голове столько идей… С чего начнём: френч, омбре или роспись кистью?"
      ]));
      lastResponseType = "smalltalk";
      return;
    }

    // Услуги (повтор)
    if (/услуг|что.*делаешь|покажи|есть|предлагаешь/i.test(lower)) {
      if (lastResponseType !== "serviceList") {
        addMessage("🦊 Конечно, вот мои услуги 👇");
        showServiceList(); lastResponseType = "serviceList";
      }
      return;
    }

    // Расскажи про …
    if (/расскажи|про/i.test(lower)) {
      const found = matchService(msg);
      if (found) {
        addMessage(`🦊 ${services[found.name]}\nЗапишем вас?`);
        lastIntent = found.name; addFollowupButtons(); lastResponseType = "serviceExact";
      } else if (lastResponseType !== "serviceList") {
        addMessage("🦊 О чём именно рассказать? Вот список услуг:");
        showServiceList(); lastResponseType = "serviceList";
      }
      return;
    }

    // Спасибо
    if (/спасибо|благодар/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Всегда пожалуйста 💖 Надеюсь, скоро увидимся!",
        "🦊 Обращайся, я тут 24/7 ☕",
        "🦊 Пожалуйста! Идеальные ногти — моя миссия ✨"
      ]));
      lastResponseType = "thanks";
      return;
    }

    // Пока
    if (/пока|до свидания|бай|увидимся|чао/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Пока-пока! Удачного дня и шикарных ногтей 💖",
        "🦊 До скорого, красотка! 💅",
        "🦊 Обнимаю! До следующего маникюра 🌷"
      ]));
      lastResponseType = "bye";
      return;
    }

    // Сервис
    const match = matchService(msg);
    if (match) {
      if (match.exact) {
        addMessage(`🦊 ${services[match.name]}\nЗапишем вас?`);
        lastIntent = match.name; addFollowupButtons(); lastResponseType = "serviceExact";
      } else {
        pendingService = match.name;
        addMessage(`🦊 Вы имели в виду "${capitalize(match.name)}"?`);
        addInlineConfirmButtons(); lastResponseType = "serviceConfirm";
      }
    } else {
      if (msg.length <= 2) {
        if (lastResponseType !== "serviceList") {
          addMessage("🦊 Не совсем поняла... Давай выберем из списка?");
          showServiceList(); lastResponseType = "serviceList";
        }
      } else {
        addMessage("🦊 Не совсем поняла... Давай выберем из списка?");
        showServiceList(); lastResponseType = "fallback";
      }
    }
  }

  // ---------------------------
  // Form submit
  // ---------------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = "";
    handleUserInput(msg);
  });

  // ---------------------------
  // Welcome message
  // ---------------------------
  setTimeout(() => {
    if (chat.childElementCount === 0) {
      addMessage("🦊 Привет, я Фокси. Спроси что-нибудь!");
      setTimeout(() => {
        addMessage("🦊 Я могу:\n💅 рассказать про услуги\n💬 помочь выбрать дизайн\n📅 записать тебя\n\nНапиши, например: «комби маникюр» или «хочу записаться» — и я всё сделаю 🧡");
      }, 3000);
    }
  }, 1000);
});
