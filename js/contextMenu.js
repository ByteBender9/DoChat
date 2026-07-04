// Hide context menu
window.addEventListener("click", () => {
    contextMenu.classList.remove("show");
});

// Edit
editMessageBtn.addEventListener("click", () => {
    if (selectedMessageIndex === null) return;
    const newText = prompt(
        "Edit message:",
        conversations[currentChat][selectedMessageIndex].text
    );
    if (newText && newText.trim() !== "") {
        conversations[currentChat][selectedMessageIndex].text = newText;
        renderMessages();
        showToast("✏️ Message edited");
    }
    contextMenu.classList.remove("show");
});

// copy
copyMessageBtn.addEventListener("click", async () => {
    if (selectedMessageIndex === null) return;
    await navigator.clipboard.writeText(
    conversations[currentChat][selectedMessageIndex].text
);
    showToast("📋 Message copied");
    contextMenu.classList.remove("show");
});

//Delete
deleteMessageBtn.addEventListener("click", () => {
    if (selectedMessageIndex === null) return;
    conversations[currentChat].splice(selectedMessageIndex, 1);
    renderMessages();
    showToast("🗑️ Message deleted");
    contextMenu.classList.remove("show");

});
// Pin / Unpin
pinMessageBtn.addEventListener("click", () => {
    if (selectedMessageIndex === null) return;
    const selected = conversations[currentChat][selectedMessageIndex];
    const pinned = pinnedMessages[currentChat];
    if (
        pinned &&
        pinned.id === selected.id)
        {
        delete pinnedMessages[currentChat];
        showToast("📍 Message unpinned");
        }
        else
            {
        pinnedMessages[currentChat] = selected;
        showToast("📌 Message pinned");
    }
    savePins();
    renderPinned();
    contextMenu.classList.remove("show");
});
// Reply
replyMessageBtn.addEventListener("click", () => {
    if(selectedMessageIndex === null) return;
    replyData = conversations[currentChat][selectedMessageIndex];
    replyUser.textContent =
    "Replying to " + replyData.sender;
    replyText.textContent =
        replyData.text;
        replyPreview.style.display = "flex";
        contextMenu.classList.remove("show");
    });
    cancelReply.addEventListener("click", () => {
    replyData = null;
    replyPreview.style.display = "none";
});