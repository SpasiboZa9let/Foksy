// normalize, capitalize и случайный выбор
export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\sа-яё]/gi, "")
    .trim();
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
