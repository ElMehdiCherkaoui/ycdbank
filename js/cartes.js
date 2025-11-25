const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

export function visibleMoney() {
	const toggleBtn = document.getElementById('btnVisible');

	const money1 = document.getElementById('money1');

	let isHidden = true;

	toggleBtn.addEventListener('click', () => {
		isHidden = !isHidden;
		money1.textContent = isHidden ? '****' : `${loggedUser.solde1} MAD`;
	});
}
export function visibleMoney2() {
	const toggleBtn2 = document.getElementById('btnVisible2');

	const money2 = document.getElementById('money2');

	let isHidden2 = true;

	toggleBtn2.addEventListener('click', () => {
		isHidden2 = !isHidden2;
		money2.textContent = isHidden2 ? '****' : `${loggedUser.solde2} MAD`;
	});
}

export function afficherPlus1() {
	const button1 = document.getElementById("afficherPlus1");

	const virements1 = document.querySelectorAll("#virementsContainer1 .virement1");

	button1.addEventListener("click", () => {
		let hiddenItems1 = Array.from(virements1).filter(v => v.classList.contains("hidden"));

		hiddenItems1.slice(0, 4).forEach(v => v.classList.remove("hidden"));

		if (Array.from(virements1).every(v => !v.classList.contains("hidden"))) {
			button1.style.display = "none";
		}
	});
}

export function afficherPlus2() {
	const button2 = document.getElementById("afficherPlus2");

	const virements2 = document.querySelectorAll("#virementsContainer2 .virement2");

	button2.addEventListener("click", () => {
		let hiddenItems2 = Array.from(virements2).filter(v => v.classList.contains("hidden"));

		hiddenItems2.slice(0, 4).forEach(v => v.classList.remove("hidden"));

		if (Array.from(virements2).every(v => !v.classList.contains("hidden"))) {
			button2.style.display = "none";
		}
	});
}

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


