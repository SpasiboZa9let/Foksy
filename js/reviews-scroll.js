// Вертикальная карусель отзывов (круглые изображения)
document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("reviews-wrapper");
  if (!wrapper) return;

  /* Загружаем HTML-шаблон с девятью <img> — см. reviews.html */
  const res  = await fetch("reviews.html");
  const html = await res.text();

  /* Создаём дорожку и дублируем содержимое для бесконечного цикла */
  const track = document.createElement("div");
  track.classList.add("reviews-track", "flex", "flex-col", "items-center");
  track.innerHTML = html + html;          // дублирование = «лента по кругу»
  wrapper.appendChild(track);

  /* Пауза на 3 с при удержании пальцем/мышью */
  let pauseTimeout;
  track.addEventListener("pointerdown", () => {
    track.classList.add("paused");
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => track.classList.remove("paused"), 3000);
  });

  /* Клик/тап по изображению — полноразмерный просмотр */
  track.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 bg-black/80 z-50 grid place-items-center";

    overlay.innerHTML = `
      <img src="${img.src}" alt="${img.alt}"
           class="max-w-full max-h-full rounded-xl shadow-xl">
      <button class="absolute top-4 right-4 text-white text-4xl font-bold select-none">&times;</button>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener("click", (ev) => {
      if (ev.target === overlay || ev.target.tagName === "BUTTON") close();
    });
    /* Закрытие по ESC */
    document.addEventListener("keydown", function esc(ev) {
      if (ev.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
    });
  });
});
