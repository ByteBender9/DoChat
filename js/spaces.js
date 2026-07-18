// 1. Move State to the Top & Prevent Scoping Issues
let savedSpaces = JSON.parse(localStorage.getItem("dochatSpaces")) || [];
const spaces = {
    coding: {
        title: "Coding Space",
        emoji: "💻",
        description: "Collaborate on coding projects together.",
        announcement: "Weekly coding challenge starts tomorrow 🚀",
        channels: ["# general", "# python", "# javascript", "# web-development", "# resources"],
        members: "Alex, Emma, John, Kush",
        files: "ProjectRoadmap.pdf"
    },
    college: {
        title: "College Space",
        emoji: "🎓",
        description: "Assignments, notes and exam discussions.",
        announcement: "Semester exams begin next Monday 📚",
        channels: ["# announcements", "# notes", "# assignments", "# placements"],
        members: "Kush, Rahul, Priya, Aman",
        files: "Operating_System_Notes.pdf"
    },
    gaming: {
        title: "Gaming Space",
        emoji: "🎮",
        description: "Find teammates and discuss games.",
        announcement: "Valorant tournament this Saturday 🎮",
        channels: ["# general", "# valorant", "# minecraft", "# clips"],
        members: "Alex, Ryan, Ethan",
        files: "TournamentSchedule.png"
    },
    design: {
        title: "Design Space",
        emoji: "🎨",
        description: "UI/UX inspiration and feedback.",
        announcement: "New Figma challenge available 🎨",
        channels: ["# ui-design", "# figma", "# inspiration"],
        members: "Emma, Sophia, Olivia",
        files: "DesignSystem.fig"
    }
};
function loadDefaultSpaces() {
    Object.keys(spaces).forEach(key => {
        const space = spaces[key];
        addSpaceCard({
            id: key,
            name: space.title,
            emoji: space.emoji,
            announcement: space.announcement,
            channels: space.channels,
            members: space.members,
            files: space.files,
            isDefault: true,
            favorite: false
        });
    });
}

const workspaceContent = document.getElementById("workspaceContent");
const spaceList = document.getElementById("spaceList");

// RENDERING WORKSPACE CONTENT
function renderWorkspace(emoji, name, announcement, channels, members, files) {
    const channelListHTML = channels.map(ch => `<li>${ch}</li>`).join('');
    
    workspaceContent.innerHTML = `
        <div class="workspace-banner">
            <h2>${emoji} ${name}</h2>
            <p>Welcome to your workspace.</p>
        </div>
        <div class="workspace-grid">
            <div class="workspace-card">
                <h3>📌 Announcement</h3>
                <p>${announcement || "No announcements yet."}</p>
            </div>
            <div class="workspace-card">
                <h3>💬 Channels</h3>
                <ul>${channelListHTML || "<li># general</li>"}</ul>
            </div>
            <div class="workspace-card">
                <h3>👥 Members</h3>
                <p>${members || "0 Members • 0 Online"}</p>
            </div>
            <div class="workspace-card">
                <h3>📁 Shared Files</h3>
                <p>${files || "No files uploaded."}</p>
            </div>
        </div>
    `;
}
// CARD GENERATION & WORKFLOW
function addSpaceCard(space) {
    const card = document.createElement("div");
    card.className = "space-card";
    
    // Injecting action buttons directly into the card structure
card.innerHTML = `
    <div class="space-icon">${space.emoji}</div>
    <div class="space-info">
        <h3>${space.name}</h3>
        <p>0 Members • 0 Online</p>
    </div>
    <button class="space-menu-btn">
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
    <div class="space-menu">
        <button class="rename-space">✏ Rename</button>
        <button class="favorite-space">
        ⭐ ${space.favorite ? "Remove Favorite" : "Favorite"}
        </button>
        <button class="delete-space">🗑 Delete</button>
    </div>       
`;

    card.addEventListener("click", () => {
        document.querySelectorAll(".space-card").forEach(c => c.classList.remove("active-space"));
        card.classList.add("active-space");
        renderWorkspace(space.emoji,space.name,space.announcement,space.channels,space.members,space.files
        );
    });
const menuBtn = card.querySelector(".space-menu-btn");
const menu = card.querySelector(".space-menu");
menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".space-menu").forEach(m => {
        if (m !== menu) m.classList.remove("show");
    });
    menu.classList.toggle("show");
});
const renameBtn = card.querySelector(".rename-space");
renameBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.remove("show");
    const newName = prompt("Rename space:", space.name);
    if (!newName) return;
    const trimmedName = newName.trim();
    if (!trimmedName) return;
    const exists = [...Object.values(spaces), ...savedSpaces].some(s =>
        s !== space &&
        (s.name || s.title).toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
        alert("A space with this name already exists.");
        return;
    }
    if (space.title){
        space.title = trimmedName;
    } else{
        space.name = trimmedName;
    }
    card.querySelector("h3").textContent=trimmedName;
    localStorage.setItem("dochatSpaces",JSON.stringify(savedSpaces))
});
const favoriteBtn = card.querySelector(".favorite-space");
favoriteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.remove("show");
    space.favorite = !space.favorite;
    favoriteBtn.textContent =
        space.favorite ? "⭐ Remove Favorite" : "⭐ Favorite";
    if (space.favorite) {
        spaceList.prepend(card);
    }
    localStorage.setItem(
        "dochatSpaces",
        JSON.stringify(savedSpaces)
    );
});
const deleteBtn = card.querySelector(".delete-space");
deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.remove("show");
    if (!confirm(`Delete "${space.name || space.title}"?`)) {
        return;
    }
    card.remove();
    if (space.id && spaces[space.id]) {
        delete spaces[space.id];
    }
    savedSpaces = savedSpaces.filter(s => s !== space);
    localStorage.setItem(
        "dochatSpaces",
        JSON.stringify(savedSpaces)
    );
});
    spaceList.appendChild(card);
}

// MODAL CONTROLS & NEW ENTRIES
const createSpaceBtn = document.querySelector(".create-space-btn");
const createSpaceModal = document.getElementById("createSpaceModal");
const closeSpaceModal = document.getElementById("closeSpaceModal");
const createSpaceConfirm = document.getElementById("createSpaceConfirm");
const spaceNameInput = document.getElementById("spaceNameInput");
const spaceEmojiInput = document.getElementById("spaceEmojiInput");

createSpaceBtn.addEventListener("click", () => createSpaceModal.style.display = "flex");
closeSpaceModal.addEventListener("click", () => createSpaceModal.style.display = "none");
createSpaceModal.addEventListener("click", (e) => {
    if (e.target === createSpaceModal) createSpaceModal.style.display = "none";
});
createSpaceConfirm.addEventListener("click", () => {
const name = spaceNameInput.value.trim();
const emoji = spaceEmojiInput.value.trim() || "🌐";
if (!name) {
    alert("Please enter a space name.");
    return;
}
// Prevent duplicate space names
const exists = savedSpaces.some(space =>
    space.name.toLowerCase() === name.toLowerCase()
);
if (exists) {
    alert("A space with this name already exists.");
    return;
}
const newSpace = {
    name,
    emoji,
    announcement: "No announcements yet.",
    channels: ["# general"],
    members: "0 Members • 0 Online",
    files: "No files uploaded.",
    favorite: false
};
savedSpaces.push(newSpace);
localStorage.setItem("dochatSpaces", JSON.stringify(savedSpaces));
    addSpaceCard(newSpace);
        if (spaceList.lastElementChild) {
        spaceList.lastElementChild.click();
    }
    spaceNameInput.value = "";
    spaceEmojiInput.value = "";
    createSpaceModal.style.display = "none";
});

// Load Custom Spaces from LocalStorage
loadDefaultSpaces();
savedSpaces.forEach(space => addSpaceCard(space));

// LIVE SEARCH FUNCTIONALITY
const spaceSearch = document.getElementById("spaceSearch");
const noSpacesMessage = document.getElementById("noSpacesMessage");

if (spaceSearch) {
    spaceSearch.addEventListener("input", () => {
        const search = spaceSearch.value.toLowerCase().trim();
        let visibleCount = 0;

        document.querySelectorAll(".space-card").forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            if (name.includes(search)) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noSpacesMessage) {
            noSpacesMessage.style.display = visibleCount === 0 ? "block" : "none";
        }
    });
}

/*closes menu*/
document.addEventListener("click", () => {
    document.querySelectorAll(".space-menu").forEach(menu => {
        menu.classList.remove("show");
    });
});