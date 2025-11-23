const nomDash = document.getElementById("nomDash");
const nomPrenom = document.getElementById("nomPrenom");

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

// ---------------------- DASHBOARD ----------------------
function nomDashboard() {
    if (!loggedUser) {
        nomDash.textContent = "Unknown user";
        return;
    }
    nomDash.innerHTML = `<span>${loggedUser.nom} ${loggedUser.prenom}</span>`;
}

function nomPrenomHome() {
    if (!loggedUser) {
        nomPrenom.textContent = "Unknown user";
        return;
    }
    nomPrenom.innerHTML = `<span>Bonjour Mr : ${loggedUser.nom} ${loggedUser.prenom}</span>`;
}

// ---------------------- RIB ----------------------
const NumeroCarnet = document.getElementById("numeroCarnet");
const NumeroCheque = document.getElementById("numeroCheque");

function RIBCheque() {
    if (!loggedUser) {
        NumeroCheque.textContent = "Unknown user";
        return;
    }
    const rib = loggedUser.id_1;
    NumeroCheque.innerHTML = `<span>${extraireNumeroCompte(rib)}</span>`;
}

function RIBCarnet() {
    if (!loggedUser) {
        NumeroCarnet.textContent = "Unknown user";
        return;
    }
    const rib = loggedUser.id_2;
    NumeroCarnet.innerHTML = `<span>${extraireNumeroCompte(rib)}</span>`;
}

const listeOperation = document.getElementById("listeOperation");
const transactions = JSON.parse(localStorage.getItem("transaction")) || [];

function afficherTransactions() {
    listeOperation.innerHTML = "";

    transactions.forEach(v => {
        let isInternal =
            (v.from === "Compte 1" && v.to === "Compte 2") ||
            (v.from === "Compte 2" && v.to === "Compte 1");

        let isExternalFromCompte1 = v.from === "Compte 1" && !["Compte 1", "Compte 2"].includes(v.to);

        if (isInternal || isExternalFromCompte1) {
            const li = document.createElement("li");
            li.className = "flex justify-between w-full border border-black rounded-xl p-3 items-center flex-wrap";


            let signe = "";
            let couleur = "";

            if (v.from === "Compte 1" && v.to === "Compte 2") {
                signe = "- ";
                couleur = "text-red-600";
            } else if (v.from === "Compte 2" && v.to === "Compte 1") {
                signe = "+ ";
                couleur = "text-green-600";
            } else if (isExternalFromCompte1) {
                signe = "- ";
                couleur = "text-red-600";
            }

            li.innerHTML = `
                <p>${v.description}</p>
                <p class="${couleur}">${signe}${v.montant}</p>
                <p>${v.date}</p>
            `;

            listeOperation.appendChild(li);
        }
    });
}

const listeOperation2 = document.getElementById("listeOperation2");
const transactions2 = JSON.parse(localStorage.getItem("transaction")) || [];

function afficherTransactionsInternes() {
    listeOperation2.innerHTML = ""; // reset

    transactions2.forEach(v => {
        // Filtrer uniquement les transactions internes
        const isInternal =
            (v.from === "Compte 1" && v.to === "Compte 2") ||
            (v.from === "Compte 2" && v.to === "Compte 1");

        if (isInternal) {
            const li = document.createElement("li");
            li.className = "flex justify-between w-full border border-black rounded-xl p-3 items-center flex-wrap";

            // Déterminer signe et couleur par rapport au compte source
            const signe = v.from === "Compte 1" ? "+ " : "- ";
            const couleur = v.from === "Compte 1" ? "text-green-600" : "text-red-600";

            li.innerHTML = `
                <p>${v.description}</p>
                <p class="${couleur}">${signe}${v.montant}</p>
                <p>${v.date}</p>
            `;

            listeOperation2.appendChild(li);
        }
    });
}



nomDashboard();
nomPrenomHome();
RIBCheque();
RIBCarnet();
afficherTransactions();
afficherTransactionsInternes();


function extraireNumeroCompte(rib) {
    if (rib.length !== 24) {
        throw new Error("Le RIB doit contenir exactement 24 caractères.");
    }
    return rib.substring(6, 22);
}




function checkForNewOperations() {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
 
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};
    if (!loggedUser.transfer_1) return; 


    const currentUser = users.find(u => u.transfer_1 === loggedUser.transfer_1);
    if (!currentUser) return;


    listeOperation.innerHTML = "";


    currentUser.infosAboutPayments.forEach(payment => {
        const li = document.createElement("li");
        li.className = "flex justify-between w-full border border-black rounded-xl p-3 items-center flex-wrap";


        li.innerHTML = `
            <p>${payment.select_value || "No Value"}</p>
            <p class="text-red-600">-${payment.Reference_value || "No Reference"}</p>
            <p class="font-bold">-${payment.userInside || "Unknown User"}</p>
        `;

        listeOperation.appendChild(li);
    });
}

// 6️⃣ Call this function on page load
window.addEventListener("DOMContentLoaded", checkForNewOperations);



