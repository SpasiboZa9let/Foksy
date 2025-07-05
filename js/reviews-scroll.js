fetch('reviews.html')
  .then(res => res.text())
  .then(html => {
    const wrapper = document.getElementById('reviews-wrapper');
    const track = document.createElement('div');
    track.className = 'flex reviews-track';
    track.innerHTML = html + html; // дублируем контент для бесконечного скролла
    wrapper.appendChild(track);

    // автопауза
    ['pointerdown', 'touchstart'].forEach(evt => {
      track.addEventListener(evt, () => track.classList.add('paused'));
    });
    ['pointerup', 'touchend', 'mouseleave'].forEach(evt => {
      track.addEventListener(evt, () => track.classList.remove('paused'));
    });
  });
