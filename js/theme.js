

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("switch-bg");
    const toggleLabel = document.getElementById("toggle-bg");
    const iconSun = toggleLabel.querySelector(".icon-sun");
    const iconMoon = toggleLabel.querySelector(".icon-moon");

    const savedMode = localStorage.getItem("theme") || "dark";
    checkbox.checked = savedMode === "light";

    // Manejo de clase active
    iconSun.classList.toggle("active", checkbox.checked);
    iconMoon.classList.toggle("active", !checkbox.checked);

    // Aplicar clase en <body> según el modo
    document.body.classList.toggle(checkbox.checked ? "light-mode" : "dark-mode");

    checkbox.addEventListener("change", () => {
        const isLight = checkbox.checked;
        localStorage.setItem("theme", isLight ? "light" : "dark");

        iconSun.classList.toggle("active", isLight);
        iconMoon.classList.toggle("active", !isLight);

        // Actualizar <body> para los colores. Quitar la anterior y aplicar la nueva
        document.body.classList.remove(isLight ? "dark-mode" : "light-mode");
        document.body.classList.add(isLight ? "light-mode" : "dark-mode");
    });
});
