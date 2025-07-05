// =============================================================
//  pseudo-ai.js — полная версия (07 июля 2025)
// =============================================================
//  • цены: 1200₽, 2000₽, 2500₽, 3000₽, 500₽
//  • «📅 Записаться» → открывает DIKIDI + Telegram
//  • триггер по «дизайн» → ссылка на Pinterest + follow-up
//  • позитивный ответ текстом → follow-up кнопки

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------------------------
  // DOM Elements
  // -----------------------------------------------------------
  const chat  = document.getElementById("pseudo-chat");
  const form  = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");
  if (!chat || !form || !input) return;

  // -----------------------------------------------------------
  // Services catalog with updated prices
  // -----------------------------------------------------------
  const services = {
    "комби маникюр":       "Снятие + комби-маникюр — 1200₽.",
    "маникюр с покрытием": "Снятие + комби + укрепление + дизайн — 2000₽.",
    "коррекция длины":     "Коррекция длины с дизайном — 2500₽.",
    "наращивание ногтей":  "Полный комплекс + индивидуальный дизайн — 3000₽.",
    "снятие покрытия":     "Снятие без дальнейшего покрытия — 500₽."
  };

  // -----------------------------------------------------------
  // State variables
  // -----------------------------------------------------------
  let pendingService   = null;
  let lastIntent       = null;
  let lastResponseType = null;

  // -----------------------------------------------------------
  // UI helpers
  // -----------------------------------------------------------
  function addMessage(txt, isHTML = false) {
    const bubble = document.createElement("div");
    bubble.className = "bg-white p-2 rounded-xl text-sm shadow whitespace-pre-line";
    if (isHTML) bubble.innerHTML = txt;
    else bubble.textContent = txt;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  function clearButtons() {
    chat.querySelectorAll("button").forEach(btn => btn.remove());
  }

  // -----------------------------------------------------------
  // Follow-up buttons
  // -----------------------------------------------------------
  function addFollowupButtons() {
    clearButtons();
    const box = document.createElement("div");
    box.className = "flex gap-2 flex-wrap";

    // 👍 Подходит
    const btnOk = document.createElement("button");
    btnOk.textContent = "👍 Подходит";
    btnOk.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    btnOk.onclick = () => addMessage(randomResponse([
      "🦊 Отлично! Обращайтесь в любое время 💅",
      "🦊 Прекрасный выбор — до скорой встречи 💖",
      "🦊 Всё записал. До связи! 🌸"
    ]));

    // ❓ Уточнить
    const btnAsk = document.createElement("button");
    btnAsk.textContent = "❓ Уточнить";
    btnAsk.className = "bg-yellow-400 text-white px-3 py-1 rounded-xl text-sm";
    btnAsk.onclick = showServiceList;

    // 📅 Записаться (две ссылки)
    const btnBook = document.createElement("button");
    btnBook.textContent = "📅 Записаться";
    btnBook.className = "bg-pink-500 text-white px-3 py-1 rounded-xl text-sm";
    btnBook.onclick = () => {
      window.open("https://dikidi.net/1456370?p=2.pi-po-ssm&o=7", "_blank");
      window.open("https://t.me/foxold_a", "_blank");
    };

    box.append(btnOk, btnAsk, btnBook);
    chat.appendChild(box);
    chat.scrollTop = chat.scrollHeight;
  }

  // -----------------------------------------------------------
  // Service list buttons
  // -----------------------------------------------------------
  function showServiceList() {
    clearButtons();
    if (lastResponseType !== 'serviceList') {
      addMessage("🦊 Вот список доступных услуг:");
      lastResponseType = 'serviceList';
    }
    const box = document.createElement("div");
    box.className = "flex gap-2 flex-wrap";
    Object.keys(services).forEach(key => {
      const btn = document.createElement("button");
      btn.textContent = capitalize(key);
      btn.className = "bg-gray-200 text-black px-3 py-1 rounded-xl text-sm";
      btn.onclick = () => handleUserInput(key);
      box.appendChild(btn);
    });
    chat.appendChild(box);
    chat.scrollTop = chat.scrollHeight;
  }

  // -----------------------------------------------------------
  // Confirmation Yes/No
  // -----------------------------------------------------------
  function addInlineConfirmButtons() {
    clearButtons();
    const box = document.createElement("div");
    box.className = "flex gap-2";
    const btnYes = document.createElement("button");
    btnYes.textContent = "👍 Да";
    btnYes.className = "bg-green-500 text-white px-3 py-1 rounded-xl text-sm";
    btnYes.onclick = () => {
      addMessage("Вы: Да");
      addMessage(`🦊 ${services[pendingService]}\nЗапишем вас?`);
      pendingService = null;
      addFollowupButtons();
    };
    const btnNo = document.createElement("button");
    btnNo.textContent = "❌ Нет";
    btnNo.className = "bg-gray-400 text-white px-3 py-1 rounded-xl text-sm";
    btnNo.onclick = () => {
      addMessage("Вы: Нет");
      addMessage("🦊 Хорошо, давай попробуем снова.");
      showServiceList();
      pendingService = null;
    };
    box.append(btnYes, btnNo);
    chat.appendChild(box);
    chat.scrollTop = chat.scrollHeight;
  }

  // -----------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------
  const capitalize = txt => txt.toLocaleLowerCase().replace(/^./u, ch => ch.toLocaleUpperCase());
  const normalize  = txt => txt.toLowerCase().replace(/[^
                                                \w\sа-яё]/gi, "").trim();
  const randomResponse = arr => arr[Math.floor(Math.random() * arr.length)];
  function matchService(txt) {
    const norm = normalize(txt);
    for (const key in services) {
      if (normalize(key) === norm) return { exact: true, name: key };
    }
    if (norm.length >= 3) {
      for (const key in services) {
        if (normalize(key).includes(norm) || norm.includes(normalize(key))) {
          return { exact: false, name: key };
        }
      }
    }
    return null;
  }

  // -----------------------------------------------------------
  // Message router
  // -----------------------------------------------------------
  function handleUserInput(message) {
    addMessage("Вы: " + message);
    const lower = message.toLowerCase().trim();

    // filter profanity
    if (/хуй|пизд|бляд|еба|сука|чмо|тупа|пошла/i.test(lower)) {
      addMessage("🦊 Давай по‑доброму — у нас тут красота и уют ✨");
      lastResponseType = 'softWarning';
      return;
    }

    // greeting
    if (/^(привет|здравствуй|хай|добрый день|доброе утро|вечер)/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Привет-привет! Я Фокси 💅 Готова помочь с ноготочками!",
        "🦊 Приветик! Что интересует сегодня — нюд, блёстки или кошачий глаз? 😘",
        "🦊 Салют! Давай выберем что-то стильное вместе 🌈"
      ]));
      lastResponseType = 'greeting';
      return;
    }

    // booking / availability
    if (/(записаться|есть\s+свобод|окно)/i.test(lower)) {
      addMessage(
        `🦊 Можно записаться двумя способами:\n\n` +
        `📅 Через DIKIDI — сам выбираешь удобное время:\n` +
        `👉 <a href="https://dikidi.net/1456370?p=2.pi-po-ssm&o=7" target="_blank" class="text-pink-600 underline">Открыть расписание</a>\n\n` +
        `💬 Или просто напиши мастеру напрямую:\n` +
        `👉 <a href="https://t.me/foxold_a" target="_blank" class="text-blue-600 underline">Связаться в Telegram</a>`,
        true
      );
      lastResponseType = 'booking';
      return;
    }

    // design trigger
    if (/(пример.*дизайн|помог.*дизайн|\bдизайн\b)/i.test(lower)) {
      addMessage(
        `🦊 Лови свежие идеи дизайна 👉 ` +
        `<a href="https://ru.pinterest.com/foksynails/%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD/?invite_code=be24647141714804b78fe8d043c1d5bf&sender=918171580188790185" target="_blank" class="text-pink-600 underline">смотреть на Pinterest</a>`,
        true
      );
      lastResponseType = 'designIdeas';
      addFollowupButtons();
      return;
    }

    // simple yes → follow-up
    if (/^(да|подходит|беру|супер|отлично|хорошо)[.!]?$/i.test(lower)) {
      addFollowupButtons();
      lastResponseType = 'positive';
      return;
    }

    // how are you
    if (/как\s+(дела|ты)/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 У меня всё отлично! Только что протестила новый дизайн с лавандой 💜",
        "🦊 Спасибо, что спросил(а)! Настроение — как свежий маникюр ✨",
        "🦊 Всё супер, только кофе опять остыл 😹 А у тебя как день идёт?"
      ]));
      lastResponseType = 'mood';
      return;
    }

    // quick how to book
    if (/как.*запис|запиш|записаться/i.test(lower)) {
      addMessage("🦊 Записаться можно прямо сейчас 💬 Жми кнопку ниже 👇");
      addFollowupButtons();
      lastResponseType = 'booking';
      return;
    }

    // what can you do
    if (/что.*умеешь|что.*можешь|ты кто/i.test(lower)) {
      addMessage("🦊 Я могу рассказать про услуги, помочь выбрать дизайн, показать прайс и записать тебя 💅");
      showServiceList();
      lastResponseType = 'about';
      return;
    }

    // help
    if (/помоги|нужна помощь|подскажи/i.test(lower)) {
      addMessage("🦊 Конечно, я рядом! Могу рассказать про услуги, показать прайс или записать тебя 💅");
      showServiceList();
      lastResponseType = 'help';
      return;
    }

    // small talk
    if (/расскажи что[- ]?нибудь/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Хмм… могу рассказать про летние тренды 💅 Или показать варианты нюда. Что интересно?",
        "🦊 А давай поговорим про дизайн с блёстками? Или тебе хочется классику сегодня?",
        "🦊 У меня в голове столько идей… С чего начнём: френч, омбре или роспись кистью?"
      ]));
      lastResponseType = 'smalltalk';
      return;
    }

    // services list
    if (/услуг|прайс|что предлагаешь/i.test(lower)) {
      if (lastResponseType !== 'serviceList') {
        addMessage("🦊 Конечно, вот мои услуги 👇");
        showServiceList();
      }
      lastResponseType = 'serviceList';
      return;
    }

    // specific service info
    if (/расскажи.*(маникюр|комби|коррекция|наращивание|снятие)/i.test(lower)) {
      const found = matchService(message);
      if (found) {
        addMessage(`🦊 ${services[found.name]}\nЗапишем вас?`);
        pendingService = found.name;
        addInlineConfirmButtons();
        lastResponseType = 'serviceConfirm';
      } else {
        showServiceList();
        lastResponseType = 'serviceList';
      }
      return;
    }

    // match service lookup
    const match = matchService(message);
    if (match) {
      if (match.exact) {
        addMessage(`🦊 ${services[match.name]}\nЗапишем вас?`);
        pendingService = match.name;
        addInlineConfirmButtons();
        lastResponseType = 'serviceExact';
      } else {
        addMessage(`🦊 Вы имели в виду "${capitalize(match.name)}"?`);
        pendingService = match.name;
        addInlineConfirmButtons();
        lastResponseType = 'serviceConfirm';
      }
      return;
    }

    // thank you
    if (/спасибо|благодар/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Всегда пожалуйста 💖 Надеюсь, скоро увидимся!",
        "🦊 Обращайся, я тут 24/7 ☕",
        "🦊 Пожалуйста! Идеальные ногти — моя миссия ✨"
      ]));
      lastResponseType = 'thanks';
      return;
    }

    // goodbye
    if (/пока|до свидания|бай|увидимся|чао/i.test(lower)) {
      addMessage(randomResponse([
        "🦊 Пока-пока! Удачного дня и шикарных ногтей 💖",
        "🦊 До скорого, красотка! 💅",
        "🦊 Обнимаю! До следующего маникюра 🌷"
      ]));
      lastResponseType = 'bye';
      return;
    }

    // fallback
    addMessage("🦊 Не совсем поняла... Давай выберем из списка?");
    showServiceList();
    lastResponseType = 'fallback';
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    handleUserInput(msg);
  });

  // welcome message
  setTimeout(() => {
    if (chat.childElementCount === 0) {
      addMessage("🦊 Привет, я Фокси. Спроси что-нибудь!");
      setTimeout(() => {
        addMessage("🦊 Я могу:\n💅 рассказать про услуги\n💬 помочь выбрать дизайн\n📅 записать тебя\n\nНапиши, например: «комби маникюр» или «хочу записаться» — и я всё сделаю 🧡");
      }, 1000);
    }
  }, 500);
});
