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
const storyName = document.getElementById("storyName");
const storyTime = document.getElementById("storyTime");
const storyImage = document.getElementById("storyImage");
const storyCaption = document.getElementById("storyCaption");
const storyAvatar = document.querySelector(".story-avatar");
const replyInput = document.querySelector(".story-reply input");

document.querySelectorAll(".story-item").forEach(item => {
    item.addEventListener("click", () => {
        document
            .querySelectorAll(".story-item")
            .forEach(card => card.classList.remove("active"));

        item.classList.add("active");

        const user = item.dataset.user;
        const moment = moments[user];

        storyName.textContent = moment.name;
        storyTime.textContent = moment.time;
        storyCaption.textContent = moment.caption;
        storyImage.src = moment.image;
        storyAvatar.src = moment.profile;

        replyInput.placeholder = `Reply to ${moment.name}...`;

        document
        .querySelectorAll(".progress")
        .forEach(bar => bar.classList.remove("active"));
        
        document
        .querySelector(".progress")
        .classList.add("active");

    });

});