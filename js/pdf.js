const NomPrenom = document.getElementById("NomPrenom");
const IbanBankID = document.getElementById("IbanBankID");
const CodeBank = document.getElementById("CodeBank");
const SubmitBtnPDF = document.getElementById("SubmitBtnPDF");
const UserPDF = JSON.parse(localStorage.getItem("users")) || [];
const bodyy = document.querySelector("#PDFContent");

NomPrenom.value = UserPDF[0].nom + " " + UserPDF[0].prenom;

IbanBankID.value = UserPDF[0].id;
CodeBank.value = UserPDF[0].transfer;
SubmitBtnPDF.addEventListener("click", () => {
    SubmitBtnPDF.style.display = "none";
    html2pdf().from(bodyy).save().then(() => {
        SubmitBtnPDF.style.display = "block";
    });
});
