const themeRadios = document.querySelectorAll('input[name="theme"]');

themeRadios.forEach(radio => {

    radio.addEventListener("change", () => {

        if (radio.value === "light") {

            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light");

        } else {

            document.body.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");

        }

    });

});

// Apply saved theme when page loads
const savedTheme = localStorage.getItem("theme") || "dark";

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
} else {
    document.body.classList.remove("light-theme");
}