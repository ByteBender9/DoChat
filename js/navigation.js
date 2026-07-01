const pages = {
    home: document.getElementById("homePage"),
    chat: document.getElementById("chatPage"),
    space: document.getElementById("spacePage"),
    story: document.getElementById("storiesPage"),
    games: document.getElementById("gamesPage"),
    ai: document.getElementById("aiPage"),
    settings: document.getElementById("settingsPage")
};

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav =>
            nav.classList.remove("active")
        );

        item.classList.add("active");

        Object.values(pages).forEach(page => {
            if(page){
                page.classList.remove("active-page");
            }
        });

        const page = pages[item.dataset.page];

        if(page){
            page.classList.add("active-page");
        }

    });

});