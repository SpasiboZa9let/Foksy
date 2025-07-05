document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("pseudo-ai-wrapper");
  if (!wrapper) return;

  const res = await fetch("pseudo-ai.html");
  const html = await res.text();
  wrapper.innerHTML = html;

  // Анимация прогресса
  const bar = document.getElementById("ai-bar");
  if (bar) {
    setTimeout(() => {
      bar.style.width = "100%";
    }, 500);
  }
});
