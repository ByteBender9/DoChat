const workspaceTitle = document.getElementById("workspaceTitle");
const workspaceDescription = document.getElementById("workspaceDescription");

document.querySelectorAll(".open-space").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".space-card");
        const name = card.querySelector("h3").textContent;

        workspaceTitle.textContent = name;
        workspaceDescription.textContent = "Welcome to " + name;

    });

});