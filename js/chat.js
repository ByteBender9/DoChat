let currentCategory = "general";
let selectedImage = null;
let selectedMessageIndex = null;
let replyData = null;

function renderMessages() {

    messages.innerHTML = "";
    const keyword = searchInput.value.toLowerCase();

    chats[currentCategory]
        .filter(msg => (msg.text || "").toLowerCase().includes(keyword))
        .forEach((msg, index) => {

            const message = document.createElement("div");
            message.className = "message";

            message.innerHTML = `
<div class="avatar profile-trigger" data-user="${msg.user}">
    <span class="status-dot ${userStatus[msg.user] ? "online" : "offline"}"></span>
                    <img src="https://i.pravatar.cc/40?img=${msg.user.length}" alt="${msg.user}">
                </div>

                <div class="content">
                    <h4>
                        ${msg.user}
                        <small style="color:gray;font-size:12px">
                            ${msg.time}
                        </small>
                    </h4>

                    ${msg.reply ? `
<div class="reply-box">

    <strong>${msg.reply.user}</strong>

    <small>${msg.reply.text}</small>

</div>
` : ""}

<p class="message-text">${msg.text}</p>

                    ${msg.image ? `<img class="chat-image" src="${msg.image}">` : ""}
                </div>
            `;

            messages.appendChild(message);

            // Profile click
            const profileTrigger = message.querySelector(".profile-trigger");

            profileTrigger.addEventListener("click", () => {
                openProfile(msg.user);
            });

            // Right click menu
            message.addEventListener("contextmenu", (e) => {

                e.preventDefault();

                selectedMessageIndex = index;

                contextMenu.style.left = e.pageX + "px";
                contextMenu.style.top = e.pageY + "px";

                const pinned = pinnedMessages[currentCategory];

if (
    pinned &&
    pinned.text === chats[currentCategory][index].text &&
    pinned.time === chats[currentCategory][index].time
) {
    pinMessageBtn.textContent = "📍 Unpin Message";
} else {
    pinMessageBtn.textContent = "📌 Pin Message";
}
                contextMenu.classList.add("show");

            });

        });

    messages.scrollTop = messages.scrollHeight;

}


// Send a message

function sendMessage(){
    const text = input.value.trim();
    if(text=== "" && !selectedImage) return;
    const time = getCurrentTime();

  chats[currentCategory].push({
    id: Date.now(),
    user: localStorage.getItem("username") || "Kush",
    text: text,
    image: selectedImage,
    time: time,
    reply: replyData
});
console.log(chats[currentCategory]);

selectedImage = null;
imageInput.value = "";

    saveChats();

    input.value="";

    renderMessages();
    replyData = null;
    replyPreview.style.display = "none";
    botReply(text);

}



// Search messages


searchInput.addEventListener("input", () => {
    renderMessages();
});


const categoryItems = document.querySelectorAll(".sidebar li");
const categoryTitle = document.querySelector(".chat header h2");

categoryItems.forEach(item => {

    item.addEventListener("click", () => {

        categoryItems.forEach(c => c.classList.remove("active"));

        item.classList.add("active");

const map = {
    "All Chats": "general",
    "Favorites": "projects",
    "Groups": "help",
    "Pinned": "memes",
    "Archived": "general",
    "Bots": "general"
};

currentCategory = map[item.textContent.trim()];

categoryTitle.textContent = item.textContent.trim();

        input.placeholder = "Message " + item.textContent.trim();

        renderMessages();

    });

});



clearChatBtn.addEventListener("click", () => {

    if (confirm("Are you sure you want to clear this channel?")) {

        chats[currentCategory] = [];

        saveChats();

        renderMessages();

    }

});


