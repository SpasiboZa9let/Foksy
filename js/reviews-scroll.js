document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("reviews-wrapper");
  if (!wrapper) return;

  // Загружаем содержимое reviews.html
  const res = await fetch("reviews.html");
  const html = await res.text();
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Извлекаем нужные изображения
  const reviewImages = temp.querySelectorAll(".review-card");
  const track = document.createElement("div");
  track.classList.add("reviews-track", "flex", "space-x-4");

  reviewImages.forEach(img => {
    const clone1 = img.cloneNode(true);
    const clone2 = img.cloneNode(true);
    track.appendChild(clone1);
    track.appendChild(clone2);

    // Добавляем обработчик клика
    [clone1, clone2].forEach(clone => {
      clone.addEventListener("click", () => {
        const modal = document.getElementById("fullscreenModal");
        const modalImg = document.getElementById("fullscreenImage");
        modal.classList.remove("hidden");
        modalImg.src = clone.src;
      });
    });
  });

  wrapper.appendChild(track);

  // Скрытие по клику вне
  const modal = document.getElementById("fullscreenModal");
  modal.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.getElementById("fullscreenImage").src = "";
  });

  // Авто-пауза
  let pauseTimeout;
  track.addEventListener("pointerdown", () => {
    track.classList.add("paused");
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      track.classList.remove("paused");
    }, 3000);
  });
});
