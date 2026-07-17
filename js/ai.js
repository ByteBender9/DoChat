const aiInput = document.getElementById("aiInput");
const aiSendBtn = document.getElementById("aiSendBtn");
const aiConversation = document.getElementById("aiConversation");
//add messege
function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `ai-message ${sender}`;
    message.textContent = text;
    aiConversation.appendChild(message);
    aiConversation.scrollTop = aiConversation.scrollHeight;
}
aiSendBtn.addEventListener("click", sendMessage);
aiInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});
//send
function sendMessage(){
    const text = aiInput.value.trim();
    if(!text) return;
    addMessage(text,"ai-user");
    aiInput.value = "";
    setTimeout(() => {
        addMessage(
            "I'm still under development. AI integration will be available soon!",
            "ai-bot"
        );
    },700);
}

const prompts = {
    "💬 Chat":"Let's chat!",
    "💻 Code":"Help me write code.",
    "📄 Summarize":"Summarize this text.",
    "🌍 Translate":"Translate this text.",
    "🎨 Image":"Generate an image.",
    "💡 Ideas":"Give me project ideas."
};
document.querySelectorAll(".ai-shortcut").forEach(button => {
    button.addEventListener("click", () => {
        aiInput.value = prompts[button.textContent];
        aiInput.focus();
    });
});