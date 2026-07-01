function botReply(userMessage) {

    let reply = "";

    switch (userMessage.toLowerCase()) {

        case "hi":
        case "hello":
            reply = "👋 Hello Kush!";
            break;

        case "help":
            reply = `Available commands:
• hello
• time
• date
• joke`;
            break;

        case "time":
            reply = new Date().toLocaleTimeString();
            break;

        case "date":
            reply = new Date().toDateString();
            break;

        case "joke":
            reply = "😂 Why do programmers prefer dark mode? Because light attracts bugs!";
            break;

        default:
            return;
    }

    setTimeout(() => {

        chats[currentCategory].push({
            user: "JavaScript Bot",
            text: reply,
            time: getCurrentTime()
        });

        saveChats();
        renderMessages();

    }, 1000);

}