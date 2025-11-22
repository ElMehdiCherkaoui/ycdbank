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

    const paymentInfo = {
        Reference_value,
        select_value,
        userInside
    };


    let Infos = JSON.parse(localStorage.getItem("Infos")) || [];
    Infos.push(paymentInfo);
    localStorage.setItem("Infos", JSON.stringify(Infos));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

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
    const saved = localStorage.getItem("userPayment");
    if (saved) {
        user_inside.innerHTML = saved;
    }
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

    let numbers = JSON.parse(localStorage.getItem("numbers")) || [];

    for (let i = 0; i < numbers.length; i++) {
        if (newNumber == numbers[i]) {
            alert("this number already exist");
            return;
        }
    }


    numbers.push(newNumber);
    localStorage.setItem("numbers", JSON.stringify(numbers));



    if (newName == "" || newNumber == "") {
        alert("invalid please fill the instructure or exit");
    }
    if (newNumber.length !== 10) {
        alert("cant find this number");
        return;
    }
    user_inside.innerHTML += `<option>${newName} - ${newNumber}</option>`;
    localStorage.setItem("userPayment", user_inside.innerHTML);
    popupEdit.classList.add("hidden");

})

