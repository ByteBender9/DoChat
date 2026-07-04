const conversations = {
    Notes: [
        { sender:"Kush",
        text:"Welcome to your personal notes.",
        time:"Now"
    }
],
    Alex: [
        { sender: "Alex", text: "Hey, are you free?", time: "10:00 AM" },
        { sender: "Kush", text: "Yes 😊", time: "10:01 AM" }
    ],
    Emma: [
        { sender: "Emma", text: "Let's catch up later.", time: "11:30 AM" }
    ],
    John: [
        { sender: "John", text: "See you tomorrow.", time: "12:15 PM" }
    ],
};

let currentChat = "Alex";
let selectedImage = null;
let selectedMessageIndex = null;
let replyData = null;

const avatars = {
    Notes:"images/profiles/notes.webp",
    Alex: "images/profiles/alex.webp",
    Emma: "images/profiles/emma.webp",
    John: "images/profiles/john.webp",
    Kush: "images/profiles/kush.webp"
};

function renderMessages() {
    messages.innerHTML = "";
    const keyword = searchInput.value.toLowerCase();
    // ORIGINAL index before filtering
    const filteredMessages = conversations[currentChat]
        .map((msg, originalIndex) => ({ ...msg, originalIndex }))
        .filter(msg => (msg.text || "").toLowerCase().includes(keyword));

    filteredMessages.forEach((msg) => {
        const message = document.createElement("div");
        message.className = "message";

        // Safeguard missing properties (like time)
        const displayTime = msg.time ?? "";
        message.innerHTML = `
            <div class="avatar profile-trigger" data-user="${msg.sender}">
                <span class="status-dot ${userStatus[msg.sender] ? "online" : "offline"}"></span>
                <img src="${avatars[msg.sender] || "images/profiles/default.webp"}" alt="${msg.sender}">
            </div>
            <div class="content">
                <h4>
                    ${msg.sender}
                    <small style="color:gray;font-size:12px">
                        ${displayTime}
                    </small>
                </h4>

                ${msg.reply ? `
                    <div class="reply-box">
                        <strong>${msg.reply.sender}</strong>
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
            openProfile(msg.sender);
        });

        // Right click menu
        message.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            // FIX: Save the original index, not the filtered loop index
            selectedMessageIndex = msg.originalIndex; 

            contextMenu.style.left = e.pageX + "px";
            contextMenu.style.top = e.pageY + "px";

            const pinned = pinnedMessages[currentChat];
            const actualMessage = conversations[currentChat][selectedMessageIndex];
            if (
                pinned &&
                pinned.text === actualMessage.text &&
                pinned.time === actualMessage.time
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
    if(text === "" && !selectedImage) return;
    conversations[currentChat].push({
        sender: "Kush",
        text: text,
        image: selectedImage,
        time: getCurrentTime(), // Ensure this function is defined globally
        reply: replyData
    });
    imageInput.value = "";
    selectedImage = null;
    input.value = "";
    replyData = null;
    if (replyPreview) replyPreview.style.display = "none";
    renderMessages();
}

// Search messages
searchInput.addEventListener("input", () => {
    renderMessages();
});

// Clear chat
clearChatBtn.addEventListener("click", () => {
    if (!confirm("Clear this conversation?")) return;
    conversations[currentChat] = [];
    renderMessages();
});

// Handle Sidebar Chat selection
const chatItems = document.querySelectorAll(".chat-item");
const headerName = document.getElementById("chatHeaderName");
const headerStatus = document.getElementById("chatHeaderStatus");
const headerAvatar = document.getElementById("chatHeaderAvatar");

chatItems.forEach(item => {
    item.addEventListener("click", () => {
        chatItems.forEach(chat => chat.classList.remove("active"));
        item.classList.add("active");
        currentChat = item.dataset.name;
        if (headerName) {
    headerName.textContent = currentChat;
}
if (headerStatus) {
    headerStatus.textContent = item.dataset.status || "Offline";
}
if (headerAvatar) {
    headerAvatar.src = item.dataset.avatar || avatars[currentChat];
        input.placeholder = "Message " + currentChat;
        renderMessages();
    };
});
});

// Initial Setup
if (headerName) headerName.textContent = "Alex";
if(headerStatus) headerStatus.textContent = "Last seen 2 min ago";
if(headerAvatar) headerAvatar.src = "images/profiles/alex.webp";


function addNewChat(name) {

    // Don't allow empty names
    if (!name.trim()) {
        alert("Please enter a name.");
        return;
    }
    // Prevent duplicates
    const exists = document.querySelector(
        `.chat-item[data-name="${name}"]`
    );
    if (exists) {
        alert("Chat already exists.");
        return;
    }
    // Create conversation
    conversations[name] = [];

    // Create sidebar item
    const chat = document.createElement("div");

    chat.className = "chat-item";

    chat.dataset.name = name;
    chat.dataset.status = "Offline";
    chat.dataset.avatar = "images/profiles/default.webp";

    chat.innerHTML = `
        <div class="chat-avatar">
            <img src="images/profiles/default.webp">
        </div>

        <div class="chat-info">
            <h4>${name}</h4>
            <p>Start chatting...</p>
        </div>
        <span class="chat-time">Now</span>
    `;

    document.querySelector(".chat-list").appendChild(chat);
    document.getElementById("newChatModal").classList.remove("show");
    document.getElementById("newChatName").value = "";

    chat.addEventListener("click", () => 
        {
    document.querySelectorAll(".chat-item").forEach(item=>{
        item.classList.remove("active");
    });

    chat.classList.add("active");
    currentChat = name;

    headerName.textContent = name;
    headerStatus.textContent = "Offline";
    headerAvatar.src = "images/profiles/default.webp";

    input.placeholder = "Message " + name;

    renderMessages();

});

}
renderMessages();