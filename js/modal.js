function openModal(src) {
  const modal = document.getElementById('imageModal');
  const image = document.getElementById('modalImage');
  image.src = src;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}
