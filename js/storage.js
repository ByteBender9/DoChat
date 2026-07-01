let chats = JSON.parse(localStorage.getItem("discordChats")) || {
    general: [],
    projects: [],
    help: [],
    memes: []
};

let userStatus = JSON.parse(localStorage.getItem("userStatus")) || {
    Kush: true,
    Alex: false,
    Emma: false,
    John: false,
    "JavaScript Bot": true
};

function saveStatus() {
    localStorage.setItem(
        "userStatus",
        JSON.stringify(userStatus)
    );
}

function saveChats() {
    localStorage.setItem(
        "discordChats",
        JSON.stringify(chats)
    );
}

function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

let pinnedMessages =
    JSON.parse(localStorage.getItem("pinnedMessages")) || {};

function savePins() {
    localStorage.setItem(
        "pinnedMessages",
        JSON.stringify(pinnedMessages)
    );
}