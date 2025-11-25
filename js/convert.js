const API_URL =
	"https://v6.exchangerate-api.com/v6/a52906b05cf0547eb05bfe81/latest/USD";

document.getElementById("convertBtn").addEventListener("click", async () => {
	const amount = parseFloat(document.getElementById("amount").value);

	const toCurrency = document.getElementById("currency").value;

	const resultInput = document.getElementById("result");

	if (isNaN(amount) || amount <= 0) {
		resultInput.value = "⚠️ Montant invalide";
		return;
	}

	try {
		const response = await fetch(API_URL);

		const data = await response.json();

		const rateUSDToMAD = 1 / data.conversion_rates.MAD;

		const rateUSDToTarget = data.conversion_rates[toCurrency];

		const rateMADToTarget = rateUSDToTarget * rateUSDToMAD;

		const converted = (amount * rateMADToTarget).toFixed(2);

		resultInput.value = `${converted} ${toCurrency}`;
	} catch (error) {
		resultInput.value = "Erreur de conversion";

		console.error("Erreur API :", error);
	}
});

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