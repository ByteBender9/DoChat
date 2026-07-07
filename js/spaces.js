const spaces = {
    coding: {
        title: "💻 Coding Space",
        description: "Collaborate on coding projects together.",
        announcement: "Weekly coding challenge starts tomorrow 🚀",
        channels: [
            "# general",
            "# python",
            "# javascript",
            "# web-development",
            "# resources"
        ],
        members: "Alex, Emma, John, Kush",
        files: "ProjectRoadmap.pdf"
    },

    college: {
        title: "🎓 College Space",
        description: "Assignments, notes and exam discussions.",
        announcement: "Semester exams begin next Monday 📚",
        channels: [
            "# announcements",
            "# notes",
            "# assignments",
            "# placements"
        ],
        members: "Kush, Rahul, Priya, Aman",
        files: "Operating_System_Notes.pdf"
    },

    gaming: {
        title: "🎮 Gaming Space",
        description: "Find teammates and discuss games.",
        announcement: "Valorant tournament this Saturday 🎮",
        channels: [
            "# general",
            "# valorant",
            "# minecraft",
            "# clips"
        ],
        members: "Alex, Ryan, Ethan",
        files: "TournamentSchedule.png"
    },

    design: {
        title: "🎨 Design Space",
        description: "UI/UX inspiration and feedback.",
        announcement: "New Figma challenge available 🎨",
        channels: [
            "# ui-design",
            "# figma",
            "# inspiration"
        ],
        members: "Emma, Sophia, Olivia",
        files: "DesignSystem.fig"
    }
};

const workspaceTitle = document.getElementById("workspaceTitle");
const workspaceDescription = document.getElementById("workspaceDescription");
const workspaceContent = document.getElementById("workspaceContent");

document.querySelectorAll(".space-card").forEach(card => {

    card.addEventListener("click", () => {

        document
            .querySelectorAll(".space-card")
            .forEach(c => c.classList.remove("active-space"));

        card.classList.add("active-space");

        const data = spaces[card.dataset.space];

        workspaceTitle.textContent = data.title;
        workspaceDescription.textContent = data.description;

        workspaceContent.innerHTML = `
            <div class="workspace-banner">
                <h2>${data.title}</h2>
                <p>${data.description}</p>
            </div>

            <div class="workspace-grid">

                <div class="workspace-card">
                    <h3>📌 Announcement</h3>
                    <p>${data.announcement}</p>
                </div>

                <div class="workspace-card">
                    <h3>💬 Channels</h3>
                    <ul>
                        ${data.channels.map(ch => `<li>${ch}</li>`).join("")}
                    </ul>
                </div>

                <div class="workspace-card">
                    <h3>👥 Members</h3>
                    <p>${data.members}</p>
                </div>

                <div class="workspace-card">
                    <h3>📁 Shared Files</h3>
                    <p>${data.files}</p>
                </div>

            </div>
        `;
    });

});