settingsBtn.addEventListener("click", () => {

    settingsModal.style.display = "flex";

    const savedTheme =
        localStorage.getItem("theme") || "dark";

    const radio = document.querySelector(
        `input[name="theme"][value="${savedTheme}"]`
    );

    if (radio) {
        radio.checked = true;
    }

});


closeSettings.addEventListener("click", () => {

    settingsModal.style.display = "none";

});

settingsModal.addEventListener("click", (e) => {

    if (e.target === settingsModal) {

        settingsModal.style.display = "none";

    }

});


saveSettings.addEventListener("click", () => {

    localStorage.setItem(
        "username",
        usernameInput.value
    );

    showToast("✅ Settings Saved");

});