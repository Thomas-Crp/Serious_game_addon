let time = 20;
let timer = null;

let chrono = document.getElementById("chrono");
let statut = document.getElementById("statut");
let virus = document.getElementById("virus");
let message = document.getElementById("message");
let bouton = document.getElementById("bouton");


bouton.addEventListener("click", function () {
  if (timer == null) {
    lancer();
  } else {
    console.log("la bombe est deja lancée !");
  }
});


function lancer() {

  time = 20;
  chrono.textContent = "00:20";
  chrono.classList.remove("rose");
  virus.className = "";
  virus.style.width = "300px";
  message.style.display = "none";

  statut.textContent = "STATUT : ARMÉE";
  bouton.textContent = "ARMÉE...";

  timer = setInterval(seconde, 1000);
}


function seconde() {
  time = time - 1;

 
  if (time >= 10) {
    chrono.textContent = "00:" + time;
  } else {
    chrono.textContent = "00:0" + time;
  }


  if (time == 5) {
    statut.textContent = "STATUT : CRITIQUE";
    chrono.classList.add("rose");
    virus.className = "danger";
    virus.style.width = "320px";
  } else if (time == 4) {
    virus.style.width = "340px";
  } else if (time == 3) {
    virus.style.width = "360px";
  } else if (time == 2) {
    virus.className = "vite";
    virus.style.width = "380px";
  } else if (time == 1) {
    virus.style.width = "400px";
  } else if (time == 0) {
    exploser();
  }
}


function exploser() {
  clearInterval(timer);

  virus.className = "boum";
  document.body.classList.add("flash");
  statut.textContent = "STATUT : DÉTONÉE";

 
  setTimeout(function () {
    document.body.classList.remove("flash");
    message.style.display = "block";
    bouton.textContent = "REJOUER";
    timer = null;
  }, 600);
}
