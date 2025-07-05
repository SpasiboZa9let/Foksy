// js/modal.js

document.addEventListener("DOMContentLoaded", () => {
  const modal    = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("gallery-modal-img");
  const thumbs   = document.querySelectorAll(".gallery-img");

  // Мгновенный отклик на тач и на pointer
  thumbs.forEach(thumb => {
    thumb.addEventListener("touchstart", openModal, { passive: true });
    thumb.addEventListener("pointerdown", openModal);
  });

  function openModal(e) {
    e.preventDefault();             // чтобы не спровоцировать двойной тап
    modalImg.src = e.currentTarget.src;
    modal.classList.remove("closing");
    modal.classList.add("open");
  }

  // Закрываем тоже по тачу или pointerdown
  [modal, modalImg].forEach(el => {
    el.addEventListener("touchstart", closeModal, { passive: true });
    el.addEventListener("pointerdown", closeModal);
  });

  function closeModal(e) {
    e.preventDefault();
    modal.classList.remove("open");
    modal.classList.add("closing");
  }
});
