const exitPopup = document.getElementById("exitPopup");

const submitbtn_edit = document.getElementById("submitbtn_edit");

const openPopup = document.getElementById("openPopup");

const popupEdit = document.getElementById("popup_edit");

const user_inside = document.getElementById("user_inside");

const select = document.getElementById("select_which");

const users_payment = document.getElementById("users_payment");

const Reference = document.getElementById("Reference");

const validatePayment = document.getElementById("validatePayment");

select.addEventListener("change", function () {
	const selectedValue = this.value;

	if (selectedValue === "inwi" || selectedValue === "maroc-telecom" || selectedValue === "orange") {
		users_payment.classList.remove("hidden");
	}

	else {
		users_payment.classList.add("hidden")
	}
});

validatePayment.addEventListener("click", () => {
	if (select.value == "inwi" || select.value == "maroc-telecom" || select.value == "orange") {
		if (!select.value) {
			alert("Please select a compte");
			return;
		}

		if (!user_inside.value) {
			alert("Please select a user");
			return;
		}
	}

	const Reference_value = Number(Reference.value);

	if (!Reference_value) {
		alert("Please enter a valid amount");
		return;
	}

	if (Reference_value > 10000) {
		alert("You can't do more than 10,000 dhs");
		return;
	}

	const select_value = select.value;

	const userInside = user_inside.value;

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = users.find(u => u.transfer_1 === loggedUser.transfer_1);

	currentUser.infosAboutPayments.push({
		Reference_value: Reference_value,
		select_value: select_value,
		userInside: userInside
	});

	const index = users.findIndex(u => u.email === loggedUser.email);

	if (index !== -1) {
		users[index].solde1 -= Reference_value;
		loggedUser.solde1 -= Reference_value;
		localStorage.setItem("users", JSON.stringify(users));
		localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
	}

	alert("Payment accepted");

	select.value = "";

	user_inside.value = "";

	Reference.value = "";

	users_payment.classList.add("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
	const saved = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	const currentUser = saved.find(u => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) return;


	user_inside.innerHTML = "";

	currentUser.userPayment.forEach(payment => {
		user_inside.innerHTML += `<option>${payment.userNameInPayment} - ${payment.userNumberInPayment}</option>`;
	});
});

openPopup.addEventListener("click", () => {
	popupEdit.classList.remove("hidden");
})

exitPopup.addEventListener("click", () => {
	popupEdit.classList.add("hidden");
})

submitbtn_edit.addEventListener("click", () => {
	const newName = document.getElementById("newName").value;

	const newNumber = document.getElementById("newNumber").value;

	if (newName == "" || newNumber == "") {
		alert("invalid please fill the instructure or exit");
	}

	if (newNumber.length !== 10) {
		alert("cant find this number");
		return;
	}

	user_inside.innerHTML += `<option>${newName} - ${newNumber}</option>`;

	const saved = JSON.parse(localStorage.getItem("users")) || [];

	const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

	if (!loggedUser.transfer_1) {
		console.error("Logged user not found or missing transfer_1");
		return;
	}

	const currentUser = saved.find(u => u.transfer_1 === loggedUser.transfer_1);

	if (!currentUser) {
		console.error("Current user not found in saved users");
		return;
	}

	const numberExists = currentUser.userPayment.some(
		payment => payment.userNumberInPayment === newNumber
	);

	if (numberExists) {
		alert("this number already exists");
		return;
	}

	currentUser.userPayment.push({
		userNameInPayment: newName,
		userNumberInPayment: newNumber
	});

	localStorage.setItem("users", JSON.stringify(saved));

	popupEdit.classList.add("hidden");

	newName = "";

	newNumber = "";

})

