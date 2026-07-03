renderMessages();
renderPinned();

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

document
.getElementById("newChatBtn")
.addEventListener("click",()=>{

    alert("New Chat coming soon 🚀");

});