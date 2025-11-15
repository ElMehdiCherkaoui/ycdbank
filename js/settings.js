const SettingUserNom = document.getElementById("SettingUserNom");
const SettingUserPrenom = document.getElementById("SettingUserPrenom");
const SettingsUserPassword = document.getElementById("SettingsUserPassword");
const SettingsUserPasswordConfirmation = document.getElementById("SettingsUserPasswordConfirmation");
const SettingsUserEmail = document.getElementById("SettingsUserEmail");
const SettingSaveBtn = document.getElementById("SettingSaveBtn");
const UsersSettings = JSON.parse(localStorage.getItem("users")) || [];
let index = 0;
SettingUserNom.placeholder = UsersSettings[index].nom;
SettingUserPrenom.placeholder = UsersSettings[index].prenom;
SettingsUserEmail.placeholder = UsersSettings[index].email;
function validatePasswordLength(password) {
    return password.length >= 8;
}
SettingSaveBtn.addEventListener("click", () => {

    if (SettingsUserPassword.value !== "") {
        if (SettingsUserPassword.value !== SettingsUserPasswordConfirmation.value) {
            alert("Passwords do not match.");
            return;
        }
        else if (!validatePasswordLength(SettingsUserPassword.value)) {
            alert("password has less then 8 characters");
            return;
        }
        UsersSettings[0].motdepasse = SettingsUserPassword.value;
        localStorage.setItem("users", JSON.stringify(UsersSettings));
    }


    if (SettingUserNom.value === "" && SettingUserPrenom.value === "" && SettingsUserEmail.value === "") {
        alert("please change before saving");
        return;
    }
    if (SettingUserNom.value !== "") {
        UsersSettings[0].nom = SettingUserNom.value;
        localStorage.setItem("users", JSON.stringify(UsersSettings));
    }
    if (SettingUserPrenom.value !== "") {
        UsersSettings[0].prenom = SettingUserPrenom.value;
        localStorage.setItem("users", JSON.stringify(UsersSettings));
    }
    if (SettingsUserEmail.value !== "") {
        UsersSettings[0].email = SettingsUserEmail.value;
        localStorage.setItem("users", JSON.stringify(UsersSettings));
    }

    alert("changes are saved succefuly!!");
    SettingUserNom.value = "";
    SettingUserPrenom.value = "";
    SettingsUserEmail.value = "";
    SettingsUserPassword.value = "";
    SettingsUserPasswordConfirmation.value = "";
})