// Hide context menu
window.addEventListener("click", () => {
    contextMenu.classList.remove("show");
});

// =======================
// Edit
// =======================

editMessageBtn.addEventListener("click", () => {

    if (selectedMessageIndex === null) return;

    const newText = prompt(
        "Edit message:",
        chats[currentCategory][selectedMessageIndex].text
    );

    if (newText && newText.trim() !== "") {

        chats[currentCategory][selectedMessageIndex].text = newText;
        chats[currentCategory][selectedMessageIndex].edited = true;

        saveChats();
        renderMessages();

        showToast("✏️ Message edited");

    }

    contextMenu.classList.remove("show");

});

// =======================
// Copy
// =======================

copyMessageBtn.addEventListener("click", async () => {

    if (selectedMessageIndex === null) return;

    await navigator.clipboard.writeText(
        chats[currentCategory][selectedMessageIndex].text
    );

    showToast("📋 Message copied");

    contextMenu.classList.remove("show");

});

// =======================
// Delete
// =======================

deleteMessageBtn.addEventListener("click", () => {

    if (selectedMessageIndex === null) return;

    chats[currentCategory].splice(selectedMessageIndex, 1);

    saveChats();

    renderMessages();

    showToast("🗑️ Message deleted");

    contextMenu.classList.remove("show");

});

// =======================
// Pin / Unpin
// =======================

pinMessageBtn.addEventListener("click", () => {

    if (selectedMessageIndex === null) return;

    const selected = chats[currentCategory][selectedMessageIndex];
    const pinned = pinnedMessages[currentCategory];

    if (
        pinned &&
        pinned.id === selected.id
    ) {

        delete pinnedMessages[currentCategory];

        showToast("📍 Message unpinned");

    } else {

        pinnedMessages[currentCategory] = selected;

        showToast("📌 Message pinned");

    }

    savePins();

    renderPinned();

    contextMenu.classList.remove("show");

});

// =======================
// Reply
// =======================

replyMessageBtn.addEventListener("click", () => {

    if(selectedMessageIndex === null) return;

    replyData = chats[currentCategory][selectedMessageIndex];

    replyUser.textContent =
        "Replying to " + replyData.user;

    replyText.textContent =
        replyData.text;

    replyPreview.style.display = "flex";

    contextMenu.classList.remove("show");

});

cancelReply.addEventListener("click", () => {

    replyData = null;

    replyPreview.style.display = "none";

});