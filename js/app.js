const LoginSubmit = document.getElementById("LoginSubmit");

LoginSubmit.addEventListener("click", ()=> {

    const UserId = document.getElementById("UserId").value.trim();
    const passwordLogin = document.getElementById("passwordLogin").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < users.length; i++) {

        console.log("Checking:", users[i]);

        
        if (users[i].transfer_1 == UserId) {

            
            if (users[i].motdepasse !== passwordLogin) {
                alert("Password invalid");
                return;
            }

            console.log("Login OK");
            window.location.href = "/pages/home.html";
            alert("hello "+users[i].nom);
            localStorage.setItem("loggedUser", JSON.stringify(users[i]));
            return; 
        }
    }

    alert("User not found");
});
