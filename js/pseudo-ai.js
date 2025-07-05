document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("pseudo-ai-wrapper");
  if (!wrapper) return;

  const res = await fetch("pseudo-ai.html");
  const html = await res.text();
  wrapper.innerHTML = html;

  const q2Block = document.getElementById("ai-q2-block");
  const thinking = document.getElementById("ai-thinking");
  const result = document.getElementById("ai-result");

  // Вопрос 1
  document.querySelectorAll('#ai-options-1 .ai-btn').forEach(btn => {
    btn.addEventListener("click", () => {
      q2Block.classList.remove("hidden");
      document.getElementById("ai-q1").classList.add("text-gray-400");
    });
  });

  // Вопрос 2
  q2Block?.querySelectorAll('.ai-btn').forEach(btn => {
    btn.addEventListener("click", () => {
      q2Block.classList.add("text-gray-400");
      thinking.classList.remove("hidden");

      setTimeout(() => {
        thinking.classList.add("hidden");
        result.classList.remove("hidden");
      }, 2000);
    });
  });
});
