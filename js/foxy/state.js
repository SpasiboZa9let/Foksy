// js/foxy/state.js

// Хранит последнее сообщение и текущее настроение
export let lastInput = "";
export function setLastInput(val) {
  lastInput = val;
}

export let foxyMood = "neutral";
export function setFoxyMood(mood) {
  foxyMood = mood;
}
