// Detectar elementos .popover-btn agregados dinámicamente
const observer = new MutationObserver(() => {
  document.querySelectorAll(".popover-btn").forEach(btn => {
    if (btn.dataset.popoverInit) return; // evitar duplicar listeners
    btn.dataset.popoverInit = "true";

    let popover = null;
    let timeoutId = null;

    btn.addEventListener("mouseenter", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".popover").forEach(p => p.remove());

      timeoutId = setTimeout(() => {
        popover = document.createElement("div");
        popover.classList.add("popover");
        popover.textContent = btn.dataset.popover;
        const position = btn.dataset.pos;
        document.body.appendChild(popover);

        const rect = btn.getBoundingClientRect();
        const left = rect.left + rect.width / 2 + window.scrollX;
        let pos = 0;

        switch (position) {
          case "bottom":
            pos = rect.bottom + window.scrollY + 6;
            break;
          case "top":
            pos = rect.top + window.scrollY - popover.offsetHeight - 6;
            break;
        }

        popover.style.top = `${pos}px`;
        popover.style.left = `${left}px`;
      }, 2000);
    });

    btn.addEventListener("mouseleave", () => {
      clearTimeout(timeoutId);
      if (popover) {
        popover.remove();
        popover = null;
      }
    });
  });
});

// Escuchar cambios en todo el documento (para cuando se agregan nuevos imgs)
observer.observe(document.body, { childList: true, subtree: true });
