document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.className =
        "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50";
      modal.innerHTML = `
        <img src="${img.src}" class="max-w-full max-h-full rounded-lg shadow-lg">
      `;

      modal.addEventListener("click", () => {
        modal.remove();
      });

      document.body.appendChild(modal);
    });
  });
});
