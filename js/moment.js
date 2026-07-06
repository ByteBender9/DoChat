const moments = {
    alex: {
        name: "Alex",
        time: "5 min ago",
        image: "images/moments/alex.jpg",
        profile: "images/profiles/alex.webp",
        caption: "Finally the weekend 😌"
    },
    emma: {
        name: "Emma",
        time: "1 hour ago",
        image: "images/moments/emma.jpg",
        profile: "images/profiles/emma.webp",
        caption: "Coffee before coding ☕"
    },
    john: {
        name: "John",
        time: "Yesterday",
        image: "images/moments/john.jpg",
        profile: "images/profiles/john.webp",
        caption: "Gaming night with friends 🎮"
    }
};
const momentView = document.getElementById("momentView");
document.querySelectorAll(".story-item").forEach(item => {
    item.addEventListener("click", () => {
        document
            .querySelectorAll(".story-item")
            .forEach(card => card.classList.remove("active"));
            item.classList.add("active");
            const user = item.dataset.user;
            const moment = moments[user];
            momentView.innerHTML = `
            <div class="moment-display">
                <div class="display-header">
                    <img src="${moment.profile}" class="display-avatar">
                    <div>
                        <h2>${moment.name}</h2>
                        <span>${moment.time}</span>
                    </div>
                </div>
                <img src="${moment.image}" class="display-photo">
                <p class="display-caption">
                    ${moment.caption}</p>
                <button class="reply-btn">
                Reply
                </button>
            </div>
        `;
    });
});