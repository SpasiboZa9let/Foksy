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

  // При касании ставим на паузу
  track.addEventListener("pointerdown", () => track.classList.add("paused"));
  track.addEventListener("pointerup", () => track.classList.remove("paused"));
});
