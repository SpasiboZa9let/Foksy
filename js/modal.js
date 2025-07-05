// js/modal.js

document.addEventListener("DOMContentLoaded", () => {
  const modal    = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("gallery-modal-img");
  const thumbs   = document.querySelectorAll(".gallery-img");

  // Открытие модалки на click и на тач (pointerup) — чтобы убрать задержку на iOS
  thumbs.forEach(thumb => {
    thumb.addEventListener("click",     openModal);
    thumb.addEventListener("pointerup", openModal);
  });

  function openModal(e) {
    modalImg.src = e.currentTarget.src;
    // Если была анимация закрытия — сбросим её
    modal.classList.remove("closing");
    // Запускаем анимацию открытия
    requestAnimationFrame(() => modal.classList.add("open"));
  }

  // Закрытие по клику или тапу на фоне или на самой картинке
  [modal, modalImg].forEach(el => {
    el.addEventListener("click",     closeModal);
    el.addEventListener("pointerup", closeModal);
  });

  function closeModal() {
    // Убираем класс открытой и добавляем класс закрывающейся
    modal.classList.remove("open");
    modal.classList.add("closing");
  }
});
