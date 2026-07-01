renderMessages();
renderPinned();

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        sendMessage();
    }
});