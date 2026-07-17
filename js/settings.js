console.log("settings.js loaded");
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

const settingsContent = document.getElementById("settingsContent");
const settingsPopup = document.getElementById("settingsPopup");
const popupTitle = document.getElementById("popupTitle");
const popupBody = document.getElementById("popupBody");
const closePopup = document.getElementById("closePopup");

function openPopup(title, content) {
    popupTitle.textContent = title;
    popupBody.innerHTML = content;
    settingsPopup.style.display = "flex";
}
//profile
const profileCard = document.getElementById("profileCard");
profileCard.addEventListener("click", () => {
    openPopup("Profile", `
        <div class="profile-form">
             <div class="profile-avatar">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="form-group">
                <label>Username</label>
                <input type="text" placeholder="Enter username">
            </div>
            <div class="form-group">
                <label>Display Name</label>
                <input type="text" placeholder="Enter display name">
            </div>
            <div class="form-group">
                <label>Bio</label>
                <textarea placeholder="Tell people about yourself"></textarea>
            </div>
            <button class="save-profile-btn">Save Changes</button>
        </div>
`);
});

//appearence
const appearanceCard = document.getElementById("appearanceCard");

appearanceCard.addEventListener("click", () => {
    openPopup("Appearance", `
        <div class="profile-form">
            <div class="form-group">
                <label>Theme</label>
                <select>
                    <option>Dark</option>
                    <option>Light</option>
                </select>
            </div>
            <div class="form-group">
                <label>Accent Color</label>
                <select>
                    <option>Blue</option>
                    <option>Purple</option>
                    <option>Green</option>
                    <option>Red</option>
                </select>
            </div>
            <button class="save-profile-btn">
                Apply Changes
            </button>
        </div>
    `);
});

//notification
const notificationCard = document.getElementById("notificationCard");
notificationCard.addEventListener("click", () => {
    openPopup("Notifications", `
        <div class="profile-form">
            <label>
                <input type="checkbox" checked>
                Message Notifications
            </label>
            <label>
                <input type="checkbox" checked>
                Sound Effects
            </label>
            <label>
                <input type="checkbox">
                Desktop Notifications
            </label>
            <button class="save-profile-btn">
                Save Changes
            </button>
        </div>
    `);
});

//privacy
const privacyCard = document.getElementById("privacyCard");

privacyCard.addEventListener("click", () => {
    openPopup("Privacy", `
        <div class="profile-form">
            <label>
                <input type="checkbox" checked>
                Show Online Status
            </label>
            <label>
                <input type="checkbox">
                Read Receipts
            </label>
            <label>
                <input type="checkbox" checked>
                Allow Friend Requests
            </label>
            <button class="save-profile-btn">
                Save Changes
            </button>
        </div>
    `);
});

//storage
const storageCard = document.getElementById("storageCard");

storageCard.addEventListener("click", () => {
    openPopup("Storage", `
        <div class="profile-form">
            <p><strong>Cache:</strong> 12 MB</p>
            <p><strong>Images:</strong> 38 MB</p>
            <p><strong>Total:</strong> 50 MB</p>

            <button class="save-profile-btn">
                Clear Cache
            </button>
        </div>
    `);
});

//about
const aboutCard = document.getElementById("aboutCard");

aboutCard.addEventListener("click", () => {
    openPopup("About", `
        <div class="profile-form">
            <h3>DoChat</h3>
            <p>Version 1.0</p>
            <p>Developed by Kushal Sarkar</p>
            <p>A modern desktop chat application built using HTML, CSS and JavaScript.</p>
        </div>
    `);
});

//close popup
closePopup.addEventListener("click", () => {
    settingsPopup.style.display = "none";
});

settingsPopup.addEventListener("click", (e) => {
    if (e.target === settingsPopup) {
        settingsPopup.style.display = "none";
    }
});