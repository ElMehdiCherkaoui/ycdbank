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

document.getElementById("confirm-btn").addEventListener("click", function (e) {
	e.preventDefault();
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
		Swal.fire({
			title: "Terms Required",
			text: "You must accept the terms to continue.",
			icon: "warning"
		});
		return;
	}

	if (!prenom || !nom || !email || !number || !naissance || !adress || !motdepasse) {
		Swal.fire({
			title: "Missing Fields",
			text: "Please fill all required fields.",
			icon: "error"
		});
		return;
	}

	if (motdepasse !== confirm_motdepasse) {
		Swal.fire({
			title: "Password Error",
			text: "Passwords do not match.",
			icon: "error"
		});
		return;
	}

	if (!validatePasswordLength(motdepasse)) {
		Swal.fire({
			title: "Weak Password",
			text: "Password must be at least 8 characters.",
			icon: "error"
		});
		return;
	}

	let users = JSON.parse(localStorage.getItem("users")) || [];

	const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
	if (emailExists) {
		Swal.fire({
			title: "Email Exists",
			text: "This email is already registered.",
			icon: "error"
		});
		return;
	}

	const idData = generateBankID();

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
		transactionsVirement: [],
		RIBSVirement: [],
		statusChèque: "Active",
		statusCarnet: "Active"
	};

	users.push(user);
	localStorage.setItem("users", JSON.stringify(users));

	Swal.fire({
		title: "Success!",
		text: "Your account was created successfully.",
		icon: "success",
		confirmButtonText: "Continue"
	}).then(() => {
		Swal.fire({
			title: "YCDBank",
			text: "Your transaction code is: " + idData.transfer,
			icon: "info",
			confirmButtonText: "OK"
		}).then(() => {
			window.location.href = "/index.html";
		});
	});
});
