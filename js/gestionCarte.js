const nomCartes1 = document.getElementById("nomCartes1");

const nomCartes2 = document.getElementById("nomCartes2");

const bloquerCarteCheque = document.getElementById("bloquerCarteCheque");

const debloquerCarteCheque = document.getElementById("debloquerCarteCheque");

const btnBloqueCarnet = document.getElementById('bloquerCarteCarnet');

const btnDeBloqueCarnet = document.getElementById('debloquerCarteCarnet');

const statutCheque = document.getElementById("statutCheque");

const statutCarnet = document.getElementById("statutCarnet");

bloquerCarteCheque.addEventListener("click", () => {
	statutCheque.textContent = "Bloqué";

	statutCheque.classList.add("text-red-600");

	statutCheque.classList.remove("text-green-600")

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find(u => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) return;

	currentUser.statusChèque = "Bloqué";

	localStorage.setItem("users", JSON.stringify(users));
})
debloquerCarteCheque.addEventListener("click", () => {
	statutCheque.textContent = "Active";

	statutCheque.classList.remove("text-red-600");

	statutCheque.classList.add("text-green-600")

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find(u => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) return;

	currentUser.statusChèque = "Active";

	localStorage.setItem("users", JSON.stringify(users));
})
btnBloqueCarnet.addEventListener("click", () => {
	statutCarnet.textContent = "Bloqué";

	statutCarnet.classList.add("text-red-600");

	statutCarnet.classList.remove("text-green-600")

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find(u => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) return;

	currentUser.statusCarnet = "Bloqué";

	localStorage.setItem("users", JSON.stringify(users));
});
btnDeBloqueCarnet.addEventListener("click", () => {
	statutCarnet.textContent = "Active";

	statutCarnet.classList.remove("text-red-600");

	statutCarnet.classList.add("text-green-600")

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find(u => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) return;

	currentUser.statusCarnet = "Active";

	localStorage.setItem("users", JSON.stringify(users));
});
window.addEventListener("DOMContentLoaded", () => {
	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find(u => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) return;

	nomCartes1.textContent = currentUser.nom + " " + currentUser.prenom;

	nomCartes2.textContent = currentUser.nom + " " + currentUser.prenom;

	if (currentUser.statusChèque === "Active") {
		statutCheque.textContent = currentUser.statusChèque;

		statutCheque.classList.remove("text-red-600");

		statutCheque.classList.add("text-green-600")
	}

	else if (currentUser.statusChèque === "Bloqué") {
		statutCheque.textContent = currentUser.statusChèque;

		statutCheque.classList.add("text-red-600");

		statutCheque.classList.remove("text-green-600")
	}

	if (currentUser.statusCarnet === "Active") {
		statutCarnet.textContent = currentUser.statusCarnet;

		statutCarnet.classList.remove("text-red-600");

		statutCarnet.classList.add("text-green-600")
	}

	else if (currentUser.statusCarnet === "Bloqué") {
		statutCarnet.textContent = currentUser.statusCarnet;

		statutCarnet.classList.add("text-red-600");

		statutCarnet.classList.remove("text-green-600")
	}
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