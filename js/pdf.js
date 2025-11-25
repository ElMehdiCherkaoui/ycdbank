const NomPrenom = document.getElementById("NomPrenom");

const IbanBankID = document.getElementById("IbanBankID");

const CodeBank = document.getElementById("CodeBank");

const SubmitBtnPDF = document.getElementById("SubmitBtnPDF");

const UserPDF = JSON.parse(localStorage.getItem("loggedUser")) || [];

const bodyy = document.querySelector("#PDFContent");

NomPrenom.value = UserPDF.nom + " " + UserPDF.prenom;

IbanBankID.value = UserPDF.id_1;

CodeBank.value = UserPDF.transfer_1;

SubmitBtnPDF.addEventListener("click", () => {
	SubmitBtnPDF.style.display = "none";

	html2pdf().from(bodyy).save().then(() => {
		SubmitBtnPDF.style.display = "block";
	});
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