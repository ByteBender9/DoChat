const viewer = document.getElementById("momentViewer");
const closeMoment = document.getElementById("closeMoment");
const momentImage = document.getElementById("momentImage");

document.querySelectorAll(".moment-trigger").forEach(item => {

    item.addEventListener("click", () => {

        if (item.tagName === "IMG") {
            momentImage.src = item.src;
        } else {
            const img = item.querySelector("img");
            if (img) {
                momentImage.src = img.src;
            }
        }

        viewer.style.display = "flex";
    });

});

closeMoment.addEventListener("click", () => {
    viewer.style.display = "none";
});

viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
        viewer.style.display = "none";
    }
});