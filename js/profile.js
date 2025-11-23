const NameProfile = document.getElementById("NameProfile");

const NumberProfile = document.getElementById("NumberProfile");

const EmailProfile = document.getElementById("EmailProfile");

const AdressProfile = document.getElementById("AdressProfile");

const UserP = JSON.parse(localStorage.getItem("loggedUser")) || [];

NameProfile.value = UserP.nom + " " + UserP.prenom;

NumberProfile.value = UserP.number;

EmailProfile.value = UserP.email;

AdressProfile.value = UserP.adress