// ELEMENTS
const beneficiarySelect = document.getElementById("beneficiarySelect");
const newBenefBtn = document.getElementById("newBenefBtn");
const popupVirement = document.getElementById("popupVirement");
const exitPopupVirement = document.getElementById("exitPopupVirement");
const comptesVirement = document.getElementById("comptesVirement");
const submitBtnVirement = document.getElementById("submitBtnVirement");

const montantVirement = document.getElementById("montantVirement");
const dateVirement = document.getElementById("dateVirement");
const montifReferenceVirement = document.getElementById("montifReferenceVirement");
const validerBtnVerment = document.getElementById("validerBtnVerment");


// ------------------ DATE AUTO ------------------
window.addEventListener("load", () => {
    const today = new Date().toISOString().split("T")[0];
    dateVirement.value = today;
});

// ------------------ POPUP ADD BENEF ------------------
newBenefBtn.addEventListener("click", () => popupVirement.classList.remove("hidden"));
exitPopupVirement.addEventListener("click", () => popupVirement.classList.add("hidden"));


// ------------------ AJOUT BENEF ------------------
submitBtnVirement.addEventListener("click", () => {
    const fullNameVirementSecond = document.getElementById("fullNameVirement").value.trim();
    const userEnterRibVirementSecond = document.getElementById("userEnterRibVirement").value.trim();

    if (!fullNameVirementSecond) return alert("Please enter the user name");
    if (!userEnterRibVirementSecond) return alert("Please enter their RIB");
    if (userEnterRibVirementSecond.length !== 6 && userEnterRibVirementSecond.length !== 24)
        return alert("This RIB is invalid");

    const saved = JSON.parse(localStorage.getItem("RIBSVirement")) || [];
    saved.push({ fullNameVirementSecond, userEnterRibVirementSecond });
    localStorage.setItem("RIBSVirement", JSON.stringify(saved));

    const option = document.createElement("option");
    option.textContent = `${fullNameVirementSecond} - ${userEnterRibVirementSecond}`;
    beneficiarySelect.appendChild(option);

    alert("Added successfully");
});


// ------------------ CHOIX COMPTE -> LISTE BENEF ------------------
comptesVirement.addEventListener("change", () => {
    const selected = comptesVirement.value;
    beneficiarySelect.innerHTML = "";

    if (selected === "Compte 2") {
        // ONLY display Compte 1
        const opt = document.createElement("option");
        opt.value = "Compte 1";
        opt.textContent = "Compte 1";
        beneficiarySelect.appendChild(opt);

    } else if (selected === "Compte 1") {

        // Add Compte 2
        const optC2 = document.createElement("option");
        optC2.value = "Compte 2";
        optC2.textContent = "Compte 2";
        beneficiarySelect.appendChild(optC2);

        // Add external beneficiers
        const saved = JSON.parse(localStorage.getItem("RIBSVirement")) || [];
        saved.forEach(item => {
            const option = document.createElement("option");
            option.value = `${item.fullNameVirementSecond}|${item.userEnterRibVirementSecond}`;
            option.textContent = `${item.fullNameVirementSecond} (${item.userEnterRibVirementSecond})`;
            beneficiarySelect.appendChild(option);
        });

    } else {
        beneficiarySelect.innerHTML = `<option value="">Sélectionner un bénéficiaire</option>`;
    }
});



const soldeUser = JSON.parse(localStorage.getItem("loggedUser")) || { solde1: 0, solde2: 0 };


validerBtnVerment.addEventListener("click", (e) => {
    e.preventDefault();

    const source = comptesVirement.value;
    const montant = parseFloat(montantVirement.value) || 0;
    const beneficiary = beneficiarySelect.value;
    const ribList = JSON.parse(localStorage.getItem("RIBSVirement")) || [];

    if (!source) return alert("Select source account");
    if (!beneficiary) return alert("Select beneficiary");
    if (montant <= 0) return alert("Enter a valid amount");
    if (!montifReferenceVirement.value.trim()) return alert("Enter a reference");

    let frais = 0;
    let type = "interne";
    let destination = beneficiary;

    // External?
    const external = ribList.find(u => beneficiary.includes(u.fullNameVirementSecond));

    if (external) {
        type = "externe";
        destination = external.fullNameVirementSecond;

        if (external.userEnterRibVirementSecond.length === 24) {
            frais = 20; // frais externe
        }
    }

    const montantFinal = montant + frais;

    // CHECK SOLDE
    if (source === "Compte 1" && soldeUser.solde1 < montantFinal)
        return alert("Insufficient balance in Compte 1");

    if (source === "Compte 2" && soldeUser.solde2 < montantFinal)
        return alert("Insufficient balance in Compte 2");


    // ------------------ VIREMENT INTERNE ------------------
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

    // ------------------ VIREMENT EXTERNE ------------------
    if (type === "externe") {
        if (source === "Compte 1") soldeUser.solde1 -= montantFinal;
        if (source === "Compte 2") soldeUser.solde2 -= montantFinal;
    }

    localStorage.setItem("loggedUser", JSON.stringify(soldeUser));

    // ------------------ SAVE TRANSACTION ------------------
    const transaction = {
        from: source,
        to: destination,
        montant: montant,
        frais: frais,
        type: type,
        date: dateVirement.value,
        description: montifReferenceVirement.value
    };

    const savedTransactions = JSON.parse(localStorage.getItem("transaction")) || [];
    savedTransactions.push(transaction);
    localStorage.setItem("transaction", JSON.stringify(savedTransactions));

    alert("Virement effectué avec succès !");

    montantVirement.value = "";
    montifReferenceVirement.value = "";
});
// ---- UPDATE USER BALANCE IN users[] LIST ----
const users = JSON.parse(localStorage.getItem("users")) || [];
const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

const index = users.findIndex(u => u.email === loggedUser.email);

if (index !== -1) {
    users[index].solde1 = loggedUser.solde1;
    console.log(users[index].solde1);
    users[index].solde2 = loggedUser.solde2;
    console.log(users[index].solde2);
    localStorage.setItem("users", JSON.stringify(users));
}
