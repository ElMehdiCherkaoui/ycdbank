function calculateAge(naissance) {
    const birth = new Date(naissance);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if ((month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}
function generateBankID() {
    let fullID = "500001";


    for (let i = 0; i < 16; i++) {
        fullID += Math.floor(Math.random() * 10);
    }

    fullID += "16";


    const transfer = fullID.slice(6, 12);

    return {
        fullID: fullID,
        transfer: Number(transfer)
    };
}
function generateBankID2() {
    let fullID = "500001";


    for (let i = 0; i < 16; i++) {
        fullID += Math.floor(Math.random() * 10);
    }

    fullID += "16";

    return fullID
}


function validatePasswordLength(password) {
    return password.length >= 8;
}

document.getElementById("confirm-btn").addEventListener("click", function () {
    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const naissance = document.getElementById("naissance").value;
    const adress = document.getElementById("adress").value.trim();
    const motdepasse = document.getElementById("motdepasse").value;
    const confirm_motdepasse = document.getElementById("confirm-motdepasse").value;
    const accept = document.getElementById("terms").checked;

    if (!accept) {
        alert("You must accept the conditions to continue.");
        return;
    }

    if (!prenom.trim() || !nom.trim() || !email.trim() || !number.trim() || !naissance || !adress.trim() || !motdepasse.trim()) {
        alert("Please fill all required fields.");
        return;
    }

    if (motdepasse !== confirm_motdepasse) {
        alert("Passwords do not match.");
        return;
    }
    if (!validatePasswordLength(motdepasse)) {
        alert("password has less then 8 characters");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);

    const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
        alert("This email is already registered!");
        return;
    }
    const idData = generateBankID();
    const idData_2 = generateBankID2();
    const user = {
        id_1: idData.fullID,
        transfer_1: idData.transfer,
        id_2: generateBankID2(),
        prenom,
        nom,
        email,
        number,
        naissance,
        age: calculateAge(naissance),
        adress,
        motdepasse,
        solde1: 10000,
        solde2: 10000,
        userPayment: [],
        infosAboutPayments: [],
    };



    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "/index.html";
    alert("Inscription saved! we will send you ur transaction in sms ");
    alert("from ycdbank : \n you transaction is : " + idData.transfer);

})
