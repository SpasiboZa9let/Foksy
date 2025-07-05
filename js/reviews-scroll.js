/* Горизонтальная бесконечная карусель отзывов */
document.addEventListener('DOMContentLoaded', async () => {
  const wrapper = document.getElementById('reviews-wrapper');
  if (!wrapper) return;

  /* 1. Загружаем фрагмент с 9 картинками */
  const res  = await fetch('reviews.html');
  const html = await res.text();

  /* 2. Создаём трек и дублируем содержимое, чтобы анимация была бесконечной */
  const track = document.createElement('div');
  track.classList.add('reviews-track', 'flex', 'items-center');
  track.innerHTML = html + html;          // удвоение = «лента по кругу»
  wrapper.appendChild(track);

  /* 3. Пауза при наведении/таче */
  track.addEventListener('pointerenter', () => track.classList.add('paused'));
  track.addEventListener('pointerleave', () => track.classList.remove('paused'));
  track.addEventListener('pointerdown',  () => track.classList.add('paused'));
  track.addEventListener('pointerup',    () => track.classList.remove('paused'));

  /* 4. Клик по кругу — полноэкранный просмотр */
  track.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/80 z-50 grid place-items-center';

    overlay.innerHTML = `
      <img src="${img.src}" alt="${img.alt}"
           class="max-w-full max-h-full rounded-xl shadow-xl">
      <button class="absolute top-4 right-4 text-white text-4xl font-bold select-none">&times;</button>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();

    overlay.addEventListener('click', ev => {
      if (ev.target === overlay || ev.target.tagName === 'BUTTON') close();
    });

    /* Закрытие по Escape */
    document.addEventListener('keydown', function esc(ev) {
      if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
  });
});
