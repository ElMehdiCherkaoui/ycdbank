const SettingUserNom = document.getElementById("SettingUserNom");

const SettingUserPrenom = document.getElementById("SettingUserPrenom");

const SettingsUserPassword = document.getElementById("SettingsUserPassword");

const SettingsUserPasswordConfirmation = document.getElementById("SettingsUserPasswordConfirmation");

const SettingsUserEmail = document.getElementById("SettingsUserEmail");

const SettingSaveBtn = document.getElementById("SettingSaveBtn");

const UsersSettings = JSON.parse(localStorage.getItem("users")) || [];

const loggedUserSettings = JSON.parse(localStorage.getItem("loggedUser")) || [];

let index = UsersSettings.findIndex(u => u.transfer_1 === loggedUserSettings.transfer_1);

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

		UsersSettings[index].motdepasse = SettingsUserPassword.value;

		loggedUserSettings.motdepasse = SettingsUserPassword.value;

		localStorage.setItem("users", JSON.stringify(UsersSettings));

		localStorage.setItem("loggedUser", JSON.stringify(loggedUserSettings));
	}

	if (SettingUserNom.value === "" && SettingUserPrenom.value === "" && SettingsUserEmail.value === "") {
		alert("please change before saving");

		return;
	}

	if (SettingUserNom.value !== "") {
		UsersSettings[index].nom = SettingUserNom.value;

		loggedUserSettings.nom = SettingUserNom.value;

		localStorage.setItem("users", JSON.stringify(UsersSettings));

		localStorage.setItem("loggedUser", JSON.stringify(loggedUserSettings));
	}

	if (SettingUserPrenom.value !== "") {
		UsersSettings[index].prenom = SettingUserPrenom.value;

		loggedUserSettings.prenom = SettingUserPrenom.value;

		localStorage.setItem("users", JSON.stringify(UsersSettings));

		localStorage.setItem("loggedUser", JSON.stringify(loggedUserSettings));
	}

	if (SettingsUserEmail.value !== "") {
		UsersSettings[index].email = SettingsUserEmail.value;

		loggedUserSettings.email = SettingsUserEmail.value;

		localStorage.setItem("users", JSON.stringify(UsersSettings));

		localStorage.setItem("loggedUser", JSON.stringify(loggedUserSettings));
	}

	alert("changes are saved succefuly!!");

	SettingUserNom.value = "";

	SettingUserPrenom.value = "";

	SettingsUserEmail.value = "";

	SettingsUserPassword.value = "";

	SettingsUserPasswordConfirmation.value = "";
})

function loadNotifications() {
	const users = JSON.parse(localStorage.getItem("users")) || [];
	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};


	const currentUser = users.find(
		(u) => u.transfer_1 === loggedUser.transfer_1
	);

	if (!currentUser) return;

	const notificationtest = document.getElementById("notificationtest");


	notificationtest.innerHTML = "";


	currentUser.transactionsVirement.forEach((t) => {
		const li = document.createElement("li");
		li.className = "bg-gray-100 p-3 rounded";

		li.innerHTML = `
			<a href="#">
				 ${t.type === "interne" ? "Virement interne" : "Virement externe"}
				de <strong>${t.from}</strong> vers <strong>${t.to}</strong>
				— <strong>${t.montant} Dh</strong>
				(${t.date})
			</a>
		`;

		notificationtest.prepend(li);
	});

	currentUser.infosAboutPayments.forEach((p) => {
		const li = document.createElement("li");
		li.className = "bg-yellow-100 p-3 rounded";

		li.innerHTML = `
			<a href="#">
				 Paiement <strong>${p.select_value}</strong>
				de <strong>${p.Reference_value} Dh</strong>
				par <strong>${p.userInside}</strong>
			</a>
		`;

		notificationtest.prepend(li);
	});
}

loadNotifications();