// js/pseudo-ai.js
import { matchIntent } from './foxy/intents.js';
import { services, randomReply, matchService } from './foxy/responses.js';
import { emoji } from './foxy/personality.js';

document.addEventListener('DOMContentLoaded', () => {
  const chat      = document.getElementById('pseudo-chat');
  const reactions = document.getElementById('pseudo-reactions');  // ← новый контейнер
  const form      = document.getElementById('pseudo-form');
  const input     = document.getElementById('pseudo-input');

  function addMessage(text, isHTML = false) {
    if (!chat) return;
    const bubble = document.createElement('div');
    bubble.className = 'bg-white p-2 rounded-xl text-sm shadow whitespace-pre-line';
    if (isHTML) bubble.innerHTML = text;
    else bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  function clearButtons() {
    if (!reactions) return;
    reactions.innerHTML = '';
  }

  function addFollowupButtons() {
    clearButtons();
    const container = document.createElement('div');
    container.className = 'flex gap-2';

    const btn1 = document.createElement('button');
    btn1.textContent = '👍 Подходит';
    btn1.className = 'bg-green-500 text-white px-3 py-1 rounded-xl text-sm';
    btn1.onclick = () => addMessage(randomReply('serviceExact'));

    const btn2 = document.createElement('button');
    btn2.textContent = '❓ Уточнить';
    btn2.className = 'bg-yellow-400 text-white px-3 py-1 rounded-xl text-sm';
    btn2.onclick = showServiceList;

    const btn3 = document.createElement('button');
    btn3.textContent = '📅 Записаться';
    btn3.className = 'bg-pink-500 text-white px-3 py-1 rounded-xl text-sm';
    btn3.onclick = showBookingOptions;

    container.append(btn1, btn2, btn3);
    reactions.appendChild(container);      // ← в reactions, а не в chat
  }

  function showServiceList() {
    clearButtons();
    // заголовок можно выводить в chat
    addMessage(`${emoji} Вот список доступных услуг:`);

    const container = document.createElement('div');
    container.className = 'flex gap-2 flex-wrap';

    Object.keys(services).forEach(key => {
      const btn = document.createElement('button');
      btn.textContent = key[0].toUpperCase() + key.slice(1);
      btn.className = 'bg-gray-200 text-black px-3 py-1 rounded-xl text-sm';
      btn.onclick = () => handleUserInput(key);
      container.appendChild(btn);
    });

    reactions.appendChild(container);      // ← в reactions
  }

  function addInlineConfirmButtons(name) {
    clearButtons();
    const container = document.createElement('div');
    container.className = 'flex gap-2';

    const btnYes = document.createElement('button');
    btnYes.textContent = '👍 Да';
    btnYes.className = 'bg-green-500 text-white px-3 py-1 rounded-xl text-sm';
    btnYes.onclick = () => {
      addMessage(`${emoji} ${services[name]}\nЗапишем вас?`);
      addFollowupButtons();
    };

    const btnNo = document.createElement('button');
    btnNo.textContent = '❌ Нет';
    btnNo.className = 'bg-gray-400 text-white px-3 py-1 rounded-xl text-sm';
    btnNo.onclick = showServiceList;

    container.append(btnYes, btnNo);
    reactions.appendChild(container);      // ← в reactions
  }

  function showBookingOptions() {
    clearButtons();
    addMessage(`${emoji} Можно записаться двумя способами:`);
    addMessage('📅 Через DIKIDI — сам выбираешь время:');

    const dikidiBtn = document.createElement('button');
    dikidiBtn.textContent = 'Открыть DIKIDI';
    dikidiBtn.className = 'bg-pink-600 text-white px-3 py-1 rounded-xl text-sm';
    dikidiBtn.onclick = () =>
      window.open('https://dikidi.net/1456370?p=2.pi-po-ssm&o=7', '_blank');
    reactions.appendChild(dikidiBtn);

    addMessage('💬 Или через Telegram:');
    const tgBtn = document.createElement('button');
    tgBtn.textContent = 'Связаться в Telegram';
    tgBtn.className = 'bg-blue-600 text-white px-3 py-1 rounded-xl text-sm';
    tgBtn.onclick = () => window.open('https://t.me/foxold_a', '_blank');
    reactions.appendChild(tgBtn);
  }

  function handleUserInput(message) {
    addMessage(`Вы: ${message}`);
    clearButtons();  // сброс реакций при каждом новом сообщении
    const lower = message.toLowerCase().trim();

    // 1) услуги
    const svc = matchService(message);
    if (svc) {
      if (svc.exact) {
        addMessage(`${emoji} ${services[svc.name]}\nЗапишем вас?`);
        addFollowupButtons();
      } else {
        addMessage(`${emoji} Вы имели в виду «${svc.name}»?`);
        addInlineConfirmButtons(svc.name);
      }
      return;
    }

    // 2) intent
    const intent = matchIntent(lower);
    switch (intent) {
      case 'design':
        addMessage(randomReply('design'), true);
        break;
      case 'booking':
        showBookingOptions();
        break;
      case 'greeting':
      case 'mood':
      case 'smalltalk':
      case 'thanks':
      case 'bye':
      case 'softWarning':
        addMessage(randomReply(intent));
        break;
      case 'help':
      case 'about':
      case 'showServices':
        showServiceList();
        break;
      default:
        addMessage(randomReply('fallback'));
        showServiceList();
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    handleUserInput(msg);
  });

  // приветствие
  setTimeout(() => {
    if (chat && chat.childElementCount === 0) {
      addMessage(`${emoji} Привет, я Фокси. Спроси что-нибудь!`);
      setTimeout(() => {
        addMessage(`${emoji} Я могу:\n💅 рассказать про услуги\n💬 помочь выбрать дизайн\n📅 записать тебя`);
      }, 1000);
    }
  }, 100);
});
