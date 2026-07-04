renderMessages();
renderPinned();

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

const newChatBtn = document.getElementById("newChatBtn");
const newChatModal = document.getElementById("newChatModal");
const closeNewChat = document.getElementById("closeNewChat");
const createChatBtn = document.getElementById("createChatBtn");
const newChatName = document.getElementById("newChatName");

newChatBtn.addEventListener("click", () => {
    newChatModal.classList.add("show");
});

closeNewChat.addEventListener("click", () => {
    newChatModal.classList.remove("show");
});

newChatModal.addEventListener("click", (e) => {
    if (e.target === newChatModal) {
        newChatModal.classList.remove("show");
    }
});

createChatBtn.addEventListener("click", () => {

    const name = newChatName.value.trim();

    if(name === ""){

        alert("Please enter a name.");

        return;

    }

    addNewChat(name);

});