const listeBeneficier = document.getElementById('listeBeneficier');

function afficherBeneficiaires() {
    listeBeneficier.innerHTML = "";
    listeBeneficier.className = 'divide-y divide-gray-100 text-gray-800';

    const saved = JSON.parse(localStorage.getItem("RIBSVirement")) || [];

    saved.forEach(d => {
        const li = document.createElement("li");
        li.className = 'flex flex-col md:flex-row md:justify-between md:items-center p-4 mb-3 rounded-lg shadow-lg bg-white border-0 gap-4';

        li.innerHTML = `
            <div class="flex-1 flex flex-col sm:flex-row sm:gap-6">
                <div class="flex-1">
                    <span class="font-bold sm:hidden">Nom: </span>
                    <span class="text-gray-800">${d.fullNameVirementSecond}</span>
                </div>

                <div class="flex-1">
                    <span class="font-bold sm:hidden">RIB: </span>
                    <span class="text-gray-800">${d.userEnterRibVirementSecond}</span>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 justify-end items-center mt-4 md:mt-0">

                <button 
                    data-modal-target="default-modal" 
                    data-modal-toggle="default-modal" 
                    class="block w-full sm:w-auto text-white bg-blue-700 hover:bg-blue-800 
                           focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                           text-sm px-5 py-2.5 text-center" 
                    type="button"
                    onclick="ouvrirModalModifier('${d.fullNameVirementSecond}')">
                    Modifier
                </button>

                <button 
                    class="block w-full sm:w-auto text-white bg-red-700 hover:bg-red-800 
                           focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                           text-sm px-5 py-2.5 text-center" 
                    type="button"
                    onclick="supprimer('${d.fullNameVirementSecond}')">
                    Supprimer
                </button>
            </div>
        `;

        listeBeneficier.appendChild(li);
    });
}

function supprimer(nom) {
    let bene = JSON.parse(localStorage.getItem("RIBSVirement")) || [];

    let nouveau = bene.filter(b => b.fullNameVirementSecond !== nom);

    localStorage.setItem("RIBSVirement", JSON.stringify(nouveau));

    afficherBeneficiaires();
}

let nomActuel = ""; 

function ouvrirModalModifier(nom) {
    const data = JSON.parse(localStorage.getItem("RIBSVirement")) || [];

    const user = data.find(b => b.fullNameVirementSecond === nom);

    if (!user) return;

    nomActuel = nom; // mémorise l'ancien nom

    // remplit les inputs du modal
    document.getElementById("editNom").value = user.fullNameVirementSecond;
    document.getElementById("editRib").value = user.userEnterRibVirementSecond;
}

function confirmerModification() {
    let data = JSON.parse(localStorage.getItem("RIBSVirement")) || [];

    const newNom = document.getElementById("editNom").value.trim();
    const newRib = document.getElementById("editRib").value.trim();

    // mise à jour de l'objet
    data = data.map(b => {
        if (b.fullNameVirementSecond === nomActuel) {
            return {
                ...b,
                fullNameVirementSecond: newNom,
                userEnterRibVirementSecond: newRib
            };
        }
        return b;
    });

    localStorage.setItem("RIBSVirement", JSON.stringify(data));

    afficherBeneficiaires();
}

afficherBeneficiaires();
