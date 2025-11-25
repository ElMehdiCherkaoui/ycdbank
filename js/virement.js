const beneficiarySelect = document.getElementById("beneficiarySelect");

const newBenefBtn = document.getElementById("newBenefBtn");

const popupVirement = document.getElementById("popupVirement");

const exitPopupVirement = document.getElementById("exitPopupVirement");

const comptesVirement = document.getElementById("comptesVirement");

const submitBtnVirement = document.getElementById("submitBtnVirement");

const montantVirement = document.getElementById("montantVirement");

const dateVirement = document.getElementById("dateVirement");

const montifReferenceVirement = document.getElementById(
	"montifReferenceVirement"
);

const validerBtnVerment = document.getElementById("validerBtnVerment");

window.addEventListener("load", () => {
	const today = new Date().toISOString().split("T")[0];
	dateVirement.value = today;
});

newBenefBtn.addEventListener("click", () =>
	popupVirement.classList.remove("hidden")
);

exitPopupVirement.addEventListener("click", () =>
	popupVirement.classList.add("hidden")
);

submitBtnVirement.addEventListener("click", () => {
	const fullNameVirementSecond = document
		.getElementById("fullNameVirement")
		.value.trim();

	const userEnterRibVirementSecond = document
		.getElementById("userEnterRibVirement")
		.value.trim();

	if (!fullNameVirementSecond) return alert("Please enter the user name");

	if (!userEnterRibVirementSecond) return alert("Please enter their RIB");

	if (
		userEnterRibVirementSecond.length !== 6 &&
		userEnterRibVirementSecond.length !== 24
	)
		return alert("This RIB is invalid");

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find((u) => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) return;

	currentUser.RIBSVirement.push({
		fullNameVirementSecond,
		userEnterRibVirementSecond,
	});

	localStorage.setItem("users", JSON.stringify(users));

	const option = document.createElement("option");

	option.textContent = `${fullNameVirementSecond} - ${userEnterRibVirementSecond}`;

	beneficiarySelect.appendChild(option);

	alert("Added successfully");
});

comptesVirement.addEventListener("change", () => {
	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};
	const currentUser = users.find((u) => u.transfer_1 === loggedUser.transfer_1);

	const selected = comptesVirement.value;

	beneficiarySelect.innerHTML = "";


	if (selected === "Compte 2" && currentUser.statusChèque === "Active") {
		const opt = document.createElement("option");

		opt.value = "Compte 1";

		opt.textContent = "Compte 1";

		beneficiarySelect.appendChild(opt);
	}
	else if (selected === "Compte 1" && currentUser.statusCarnet === "Active") {
		const optC2 = document.createElement("option");

		optC2.value = "Compte 2";

		optC2.textContent = "Compte 2";

		beneficiarySelect.appendChild(optC2);



		const currentUser = users.find(
			(u) => u.transfer_1 === loggedUser.transfer_1
		);

		if (!currentUser) return;

		const ribList = currentUser.RIBSVirement || [];

		ribList.forEach((item) => {
			const option = document.createElement("option");

			option.value = `${item.fullNameVirementSecond}|${item.userEnterRibVirementSecond}`;

			option.textContent = `${item.fullNameVirementSecond} (${item.userEnterRibVirementSecond})`;

			beneficiarySelect.appendChild(option);
		});
	} else if (currentUser.statusCarnet !== "Active" || currentUser.statusChèque !== "Active" && selected === "Compte 1" || selected === "Compte 2") {
		alert("cant");
		comptesVirement.value = "Choisir le compte";
		return;
	}
	else {
		beneficiarySelect.innerHTML = `<option value="">Sélectionner un bénéficiaire</option>`;
	}
});

const soldeUser = JSON.parse(localStorage.getItem("loggedUser")) || {
	solde1: 0,
	solde2: 0,
};

validerBtnVerment.addEventListener("click", (e) => {
	e.preventDefault();

	const source = comptesVirement.value;

	const montant = parseFloat(montantVirement.value) || 0;

	const beneficiary = beneficiarySelect.value;

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find((u) => u.transfer_1 === loggedUser.transfer_1);

	if (!source) return alert("Select source account");

	if (!beneficiary) return alert("Select beneficiary");

	if (montant <= 0) return alert("Enter a valid amount");

	if (!montifReferenceVirement.value.trim()) return alert("Enter a reference");

	let frais = 0;

	let type = "interne";

	let destination = beneficiary;

	const external = currentUser.RIBSVirement.find((u) =>
		beneficiary.includes(u.fullNameVirementSecond)
	);

	if (external) {
		type = "externe";

		destination = external.fullNameVirementSecond;

		if (external.userEnterRibVirementSecond.length === 24) {
			frais = 20;
		}
	}

	const montantFinal = montant + frais;

	if (source === "Compte 1" && soldeUser.solde1 < montantFinal)
		return alert("Insufficient balance in Compte 1");

	if (source === "Compte 2" && soldeUser.solde2 < montantFinal)
		return alert("Insufficient balance in Compte 2");

	if (type === "interne") {
		if (source === "Compte 1" && beneficiary === "Compte 2") {
			soldeUser.solde1 -= montantFinal;
			soldeUser.solde2 += montant;
		}

		if (source === "Compte 2" && beneficiary === "Compte 1") {
			soldeUser.solde2 -= montantFinal;
			soldeUser.solde1 += montant;
		}
	}

	if (type === "externe") {
		if (source === "Compte 1") soldeUser.solde1 -= montantFinal;
		if (source === "Compte 2") soldeUser.solde2 -= montantFinal;
	}

	localStorage.setItem("loggedUser", JSON.stringify(soldeUser));

	const transaction = {
		from: source.trim(),
		to: destination.trim(),
		montant: montant + frais,
		frais,
		type,
		date: dateVirement.value,
		description: montifReferenceVirement.value,
	};

	if (!currentUser) return;

	currentUser.transactionsVirement.push(transaction);

	localStorage.setItem("users", JSON.stringify(users));

	montantVirement.value = "";

	montifReferenceVirement.value = "";
	alert("Virement effectué avec succès !");


});

const users = JSON.parse(localStorage.getItem("users")) || [];

const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

const index = users.findIndex((u) => u.email === loggedUser.email);

if (index !== -1) {
	users[index].solde1 = loggedUser.solde1;

	console.log(users[index].solde1);

	users[index].solde2 = loggedUser.solde2;

	console.log(users[index].solde2);

	localStorage.setItem("users", JSON.stringify(users));
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