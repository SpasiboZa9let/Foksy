document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("reviews-wrapper");

  if (!wrapper) return;

  const res = await fetch("reviews.html");
  const html = await res.text();

  const temp = document.createElement("div");
  temp.innerHTML = html;

  const track = document.createElement("div");
  track.classList.add("reviews-track", "flex", "space-x-4");
  track.innerHTML = temp.innerHTML + temp.innerHTML; // дублируем
  wrapper.appendChild(track);

  // Авто-снятие паузы после 3 секунд
  let pauseTimeout;

  track.addEventListener("pointerdown", () => {
    track.classList.add("paused");

    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      track.classList.remove("paused");
    }, 3000); // снимаем паузу через 3 сек
  });
});
