const NameProfile = document.getElementById("NameProfile");

const NumberProfile = document.getElementById("NumberProfile");

const EmailProfile = document.getElementById("EmailProfile");

const AdressProfile = document.getElementById("AdressProfile");

const UserP = JSON.parse(localStorage.getItem("loggedUser")) || [];

NameProfile.value = UserP.nom + " " + UserP.prenom;

NumberProfile.value = UserP.number;

EmailProfile.value = UserP.email;

AdressProfile.value = UserP.adress

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