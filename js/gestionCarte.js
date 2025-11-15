let statutsChq = "Active"; 
let statutsCrt = "Active";

function statut() {
    const statutCarnet = document.getElementById('statutCarnet');
    const btnBloqueCarnet = document.getElementById('bloquerCarteCarnet');
    const btnDeBloqueCarnet = document.getElementById('debloquerCarteCarnet');
    

    btnBloqueCarnet.addEventListener('click', () => {  
        statutsCrt = "Bloquer"
        localStorage.setItem("statutcrt", statutsCrt);
        statutCarnet.innerHTML = `<span class="font-medium text-red-600">${statutsCrt}</span>`
    })

    btnDeBloqueCarnet.addEventListener('click', () => {
        statutsCrt = "Active"
        localStorage.setItem("statutcrt", statutsCrt);
        
        statutCarnet.innerHTML = `<span class="font-medium text-green-600">${statutsCrt}</span>`
    })
    

    const st = localStorage.getItem('statutcrt');

    let color1 = "";
    if (st == "Active") {
        color1 = "text-green-600";
    } else {
        color1 = "text-red-600";
    }

    statutCarnet.innerHTML = `<span class="font-medium ${color1}">${st}</span>`

}


function statut2() {

    const statutCheque = document.getElementById('statutCheque');
    const bloquerCarteCheque = document.getElementById('bloquerCarteCheque');
    const btnDeBloqueCheque = document.getElementById('debloquerCarteCheque');

    

    bloquerCarteCheque.addEventListener('click', () => {
        statutsChq = "Bloquer"
        localStorage.setItem("statutsChq", statutsChq);
        statutCheque.innerHTML = `<span class="font-medium text-red-600">${statutsChq}</span>`
    })

    btnDeBloqueCheque.addEventListener('click', () => {
        statutsChq = "Active"
        localStorage.setItem("statutsChq", statutsChq);
        
        statutCheque.innerHTML = `<span class="font-medium text-green-600">${statutsChq}</span>`
    })


    const st2 = localStorage.getItem('statutsChq');
    
    let color = "";
    if (st2 == "Active") {
        color = "text-green-600";
    } else {
        color = "text-red-600";
    }
   

    statutCheque.innerHTML = `<span class="font-medium ${color}">${st2}</span>`
}

statut2();
statut();