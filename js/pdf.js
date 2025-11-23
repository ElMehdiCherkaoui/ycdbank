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
