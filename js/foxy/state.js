// js/foxy/state.js

// фильтр повторов
export let lastInput = "";
export function setLastInput(val) {
  lastInput = val;
}

// сейчас статично, но можно менять
export let foxyMood = "neutral";
export function setFoxyMood(mood) {
  foxyMood = mood;
}
