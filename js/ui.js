const menuBtn = document.getElementById("menuBtn");
const menuContent = document.getElementById("menuContent");

menuBtn.addEventListener("click", () => {
    menuContent.classList.toggle("show");
});

window.addEventListener("click", (e) => {
    if (!e.target.matches("#menuBtn")) {
        menuContent.classList.remove("show");
    }
});

//emoji picker
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");

emojiBtn.addEventListener("click", () => {
    emojiPicker.classList.toggle("show");
});

emojiPicker.querySelectorAll("span").forEach(emoji => {
    emoji.addEventListener("click", () => {
        input.value += emoji.textContent;
        emojiPicker.classList.remove("show");
        input.focus();
    });
});

//Toast function 
function showToast(message){
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

//image upload
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e){
        selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
});

//memberList
function renderMembers(){
    const members = document.getElementById("membersList");
    members.innerHTML = "";
    Object.keys(userStatus).forEach(user=>{
        members.innerHTML += `
        <div class="member">
            <span class="dot ${userStatus[user] ? "online" : "offline"}"></span>
            ${user}
        </div>
        `;
    });
}

function renderPinned(){
    const pinned =
    pinnedMessages[currentChat];
    if(!pinned)
        {
            pinnedContainer.style.display = "none";
            return;
        }

    pinnedContainer.style.display = "block";
    pinnedText.textContent = pinned.text;
}