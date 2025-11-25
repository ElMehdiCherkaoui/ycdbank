const LoginSubmit = document.getElementById("LoginSubmit");

LoginSubmit.addEventListener("click", (event) => {
	event.preventDefault(); 

	const UserId = document.getElementById("UserId").value.trim();
	const passwordLogin = document.getElementById("passwordLogin").value.trim();

	const users = JSON.parse(localStorage.getItem("users")) || [];

	for (let i = 0; i < users.length; i++) {
		if (users[i].transfer_1 == UserId) {

			if (users[i].motdepasse !== passwordLogin) {
				Swal.fire({
					title: "Password invalid",
					icon: "error",
				});

				return;
			}

			Swal.fire({
				title: "hello " + users[i].nom,
				icon: "success",
				confirmButtonText: "OK"
			}).then(() => {
				localStorage.setItem("loggedUser", JSON.stringify(users[i]));
				window.location.href = "/pages/home.html";;
			});


			return;
		}
	}

	Swal.fire({
		title: "User not found!",
		icon: "error",
		draggable: true
	});
});
