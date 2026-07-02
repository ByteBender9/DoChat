const conversations = {
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
    Kush: [
        { sender: "Kush", text: "📷 Sent a photo", time: "01:00 PM" }
    ]
};

let currentChat = "Alex";
let selectedImage = null;
let selectedMessageIndex = null;
let replyData = null;

function renderMessages() {
    messages.innerHTML = "";
    const keyword = searchInput.value.toLowerCase();

    // 1. Map to keep track of the ORIGINAL index before filtering
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
                <img src="https://i.pravatar.cc/40?img=${msg.sender.length}" alt="${msg.sender}">
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
        sender: localStorage.getItem("username") || "Kush",
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
    //if (typeof botReply === "function") botReply(text);
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
    headerAvatar.src = item.dataset.avatar || "https://i.pravatar.cc/100";
}
        input.placeholder = "Message " + currentChat;
        
        renderMessages();
    });
});

// Initial Setup
if (headerName) headerName.textContent = "Alex";
if(headerStatus) headerStatus.textContent = "Last seen 2 min ago";
if(headerAvatar) headerAvatar.src = "https://i.pravatar.cc/100?img=1";

renderMessages();