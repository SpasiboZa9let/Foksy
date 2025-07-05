document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".reviews-track");
  if (!track) return;

  // Дублируем изображения для бесконечного скролла
  const imgs = Array.from(track.querySelectorAll(".review-card"));
  imgs.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  // Обработчики клика по каждой карточке
  const modal = document.getElementById("fullscreenModal");
  const modalImg = document.getElementById("fullscreenImage");

  track.querySelectorAll(".review-card").forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modalImg.src = img.src;
    });
  });

  // Закрытие модального окна по клику
  modal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalImg.src = "";
  });

  // Авто-пауза при удержании или тапе
  let pauseTimeout;
  track.addEventListener("pointerdown", () => {
    track.classList.add("paused");
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      track.classList.remove("paused");
    }, 3000);
  });
});
