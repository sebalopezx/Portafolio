document.addEventListener("mousemove", (e) => {

    const pupils = document.querySelectorAll(".pupil")

    pupils.forEach(pupil => {

        const rect = pupil.parentElement.getBoundingClientRect()

        const eyeX = rect.left + rect.width/2
        const eyeY = rect.top + rect.height/2

        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX)

        const moveX = Math.cos(angle) * 2
        const moveY = Math.sin(angle) * 2

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`

    })

})

document.addEventListener("mouseover", (e) => {
    const el = e.target;

    if (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        getComputedStyle(el).cursor === "pointer"
    ) {
        document.body.classList.add("hovering");
    }
});

document.addEventListener("mouseout", (e) => {
    const el = e.target;

    if (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        getComputedStyle(el).cursor === "pointer"
    ) {
        document.body.classList.remove("hovering");
    }
});