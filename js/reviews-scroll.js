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
document.querySelectorAll(".review-card").forEach(img => {
  img.addEventListener("click", () => {
    const modal = document.getElementById("modalOverlay");
    const modalImg = document.getElementById("modalImage");
    modalImg.src = img.src;
    modal.classList.remove("hidden");
  });
});

document.getElementById("modalOverlay").addEventListener("click", () => {
  document.getElementById("modalOverlay").classList.add("hidden");
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("fullscreenModal");
  const modalImg = document.getElementById("fullscreenImage");

  document.querySelectorAll(".review-card").forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modalImg.src = img.src;
    });
  });

  modal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalImg.src = "";
  });
});

