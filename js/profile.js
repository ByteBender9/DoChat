function openProfile(user){

    profileModal.style.display = "flex";

    profileName.textContent = user;

    profileAvatar.src = `https://i.pravatar.cc/120?u=${user}`;

    let total = 0;

    Object.values(chats).forEach(channel => {

        total += channel.filter(m => m.user === user).length;

    });

    messageCount.textContent = "Messages: " + total;

    currentChannelProfile.textContent =
    "Current Chat: " + currentCategory;
}

closeProfile.addEventListener("click", () => {

    profileModal.style.display = "none";

});

profileModal.addEventListener("click", (e) => {

    if(e.target === profileModal){

        profileModal.style.display = "none";

    }

    const status = document.querySelector(".status");

status.textContent = userStatus[user]
    ? "🟢 Online"
    : "⚫ Offline";

});


