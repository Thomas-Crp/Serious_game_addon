let time = 20;
let timer = null;

// la partie
let joueurs = [];
let bugs = [];
let round = 1;
let joueurActuel = 0;
let nbTours = 0;
let enJeu = false;
let enPause = false;

// les themes (les 7 cartes physiques + les 5 de l'addon)
let themes = ["SOCIAL MEDIA", "CYBER SECURITY", "DESIGN", "HARDWARE", "DATA", "INTERNET", "MOBILE", "GAMING", "ARTIFICIAL INTELLIGENCE", "STREAMING", "CODING", "E-COMMERCE"];
let images = ["assets/cartes/01_social_media.svg", "assets/cartes/02_cyber_security.svg", "assets/cartes/03_design.svg", "assets/cartes/04_hardware.svg", "assets/cartes/05_data.svg", "assets/cartes/06_internet.svg", "assets/cartes/07_mobile.svg", "assets/cartes/08_gaming.svg", "assets/cartes/09_ai.svg", "assets/cartes/10_streaming.svg", "assets/cartes/11_coding.svg", "assets/cartes/12_ecommerce.svg"];
let themesSortis = [];
let themeActuel = "";

// les ecrans
let ecranJoueurs = document.getElementById("ecran-joueurs");
let ecranTheme = document.getElementById("ecran-theme");
let ecranJeu = document.getElementById("ecran-jeu");
let ecranFin = document.getElementById("ecran-fin");

// ecran joueurs
let nombre = document.getElementById("nombre");
let btnNombre = document.getElementById("btn-nombre");
let listeNoms = document.getElementById("liste-noms");
let btnCommencer = document.getElementById("btn-commencer");

// ecran theme
let roundTheme = document.getElementById("round-theme");
let btnTheme = document.getElementById("btn-theme");
let carte = document.getElementById("carte");
let nomTheme = document.getElementById("nom-theme");
let consigne = document.getElementById("consigne");
let btnValider = document.getElementById("btn-valider");

// ecran jeu
let roundJeu = document.getElementById("round-jeu");
let tour = document.getElementById("tour");
let chrono = document.getElementById("chrono");
let statut = document.getElementById("statut");
let virus = document.getElementById("virus");
let message = document.getElementById("message");
let aide = document.getElementById("aide");
let btnPause = document.getElementById("btn-pause");
let bouton = document.getElementById("bouton");

// ecran fin
let titreFin = document.getElementById("titre-fin");
let scores = document.getElementById("scores");
let btnSuivant = document.getElementById("btn-suivant");


// =============== CHANGER D'ECRAN ===============

function afficherEcran(nom) {
  if (nom == "joueurs") {
    ecranJoueurs.style.display = "block";
    ecranTheme.style.display = "none";
    ecranJeu.style.display = "none";
    ecranFin.style.display = "none";
  } else if (nom == "theme") {
    ecranJoueurs.style.display = "none";
    ecranTheme.style.display = "block";
    ecranJeu.style.display = "none";
    ecranFin.style.display = "none";
  } else if (nom == "jeu") {
    ecranJoueurs.style.display = "none";
    ecranTheme.style.display = "none";
    ecranJeu.style.display = "block";
    ecranFin.style.display = "none";
  } else if (nom == "fin") {
    ecranJoueurs.style.display = "none";
    ecranTheme.style.display = "none";
    ecranJeu.style.display = "none";
    ecranFin.style.display = "block";
  }
}


// =============== ECRAN 1 : LES JOUEURS ===============

btnNombre.addEventListener("click", function () {
  let nb = Number(nombre.value);

  if (nb < 2) {
    alert("Il faut au moins 2 joueurs !");
  } else if (nb > 8) {
    alert("8 joueurs maximum !");
  } else {
    // on cree un champ pour chaque joueur
    listeNoms.innerHTML = "";
    for (let i = 1; i <= nb; i++) {
      listeNoms.innerHTML += '<input type="text" class="nom" placeholder="JOUEUR ' + i + '">';
    }
    btnCommencer.style.display = "inline-block";
  }
});

btnCommencer.addEventListener("click", function () {
  let champs = document.getElementsByClassName("nom");
  joueurs = [];
  bugs = [];

  for (let i = 0; i < champs.length; i++) {
    if (champs[i].value == "") {
      joueurs.push("JOUEUR " + (i + 1));
    } else {
      joueurs.push(champs[i].value.toUpperCase());
    }
    bugs.push(0);
  }

  round = 1;
  themesSortis = [];
  preparerRound();
});


// =============== ECRAN 2 : LE THEME ===============

function preparerRound() {
  roundTheme.textContent = "ROUND " + round + " / 6";
  btnTheme.style.display = "inline-block";
  carte.style.display = "none";
  nomTheme.textContent = "";
  consigne.style.display = "none";
  btnValider.style.display = "none";
  afficherEcran("theme");
}

btnTheme.addEventListener("click", function () {
  // on tire un theme au hasard qui n'est pas deja sorti
  let numero = Math.floor(Math.random() * themes.length);
  while (themesSortis.includes(numero)) {
    numero = Math.floor(Math.random() * themes.length);
  }
  themesSortis.push(numero);
  themeActuel = themes[numero];

  carte.src = images[numero];
  carte.style.display = "block";
  nomTheme.textContent = "THÈME : " + themeActuel;
  consigne.style.display = "block";
  btnValider.style.display = "inline-block";
  btnTheme.style.display = "none";
});

btnValider.addEventListener("click", function () {
  // le premier joueur change a chaque round
  joueurActuel = (round - 1) % joueurs.length;
  nbTours = 0;
  roundJeu.textContent = "ROUND " + round + " / 6 · THÈME : " + themeActuel;
  afficherEcran("jeu");
  lancer();
});


// =============== ECRAN 3 : LE JEU ===============

function lancer() {

  time = 20;
  chrono.textContent = "00:20";
  chrono.classList.remove("rose");
  virus.className = "";
  virus.style.width = "300px";
  message.style.display = "none";

  tour.textContent = "AU TOUR DE : " + joueurs[joueurActuel];
  statut.textContent = "STATUT : ARMÉE";
  aide.style.display = "block";
  btnPause.style.display = "inline-block";
  btnPause.textContent = "PAUSE";
  bouton.style.display = "none";

  // pour que la touche espace n'appuie pas sur un bouton
  document.activeElement.blur();

  enJeu = true;
  enPause = false;
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


// le joueur appuie sur espace : il a trouve son mot
document.addEventListener("keydown", function (e) {
  if (e.code == "Space") {
    e.preventDefault();

    if (enJeu == false) {
      console.log("pas de joueur en cours");
    } else if (enPause == true) {
      console.log("le jeu est en pause");
    } else {
      trouve();
    }
  }
});

function trouve() {
  clearInterval(timer);
  enJeu = false;

  virus.className = "desamorce";
  virus.style.width = "300px";
  chrono.classList.remove("rose");
  statut.textContent = "STATUT : DÉSAMORCÉE";
  message.textContent = "MOT TROUVÉ !";
  message.style.display = "block";
  btnPause.style.display = "none";

  // on passe au joueur suivant apres 1 seconde
  setTimeout(function () {
    joueurFini();
  }, 1000);
}


function exploser() {
  clearInterval(timer);
  enJeu = false;

  bugs[joueurActuel] = bugs[joueurActuel] + 1;

  virus.className = "boum";
  document.body.classList.add("flash");
  statut.textContent = "STATUT : DÉTONÉE";
  btnPause.style.display = "none";
  aide.style.display = "none";


  setTimeout(function () {
    document.body.classList.remove("flash");
    message.textContent = joueurs[joueurActuel] + " PREND UN BUG !";
    message.style.display = "block";

    if (nbTours + 1 == joueurs.length) {
      bouton.textContent = "FIN DU ROUND";
    } else {
      bouton.textContent = "JOUEUR SUIVANT";
    }
    bouton.style.display = "inline-block";
  }, 600);
}

bouton.addEventListener("click", function () {
  joueurFini();
});


function joueurFini() {
  nbTours = nbTours + 1;

  if (nbTours == joueurs.length) {
    // tout le monde a joue
    finRound();
  } else {
    joueurActuel = joueurActuel + 1;
    if (joueurActuel == joueurs.length) {
      joueurActuel = 0;
    }
    lancer();
  }
}


// le bouton pause
btnPause.addEventListener("click", function () {
  if (enJeu == false) {
    console.log("rien a mettre en pause");
  } else if (enPause == false) {
    clearInterval(timer);
    enPause = true;
    btnPause.textContent = "REPRENDRE";
    statut.textContent = "STATUT : EN PAUSE";
    virus.classList.add("pause");
  } else {
    timer = setInterval(seconde, 1000);
    enPause = false;
    btnPause.textContent = "PAUSE";
    virus.classList.remove("pause");
    if (time <= 5) {
      statut.textContent = "STATUT : CRITIQUE";
    } else {
      statut.textContent = "STATUT : ARMÉE";
    }
  }
  btnPause.blur();
});


// =============== ECRAN 4 : FIN DU ROUND / DE LA PARTIE ===============

function afficherScores() {
  scores.innerHTML = "";
  for (let i = 0; i < joueurs.length; i++) {
    if (bugs[i] == 0) {
      scores.innerHTML += "<li>" + joueurs[i] + " : 0 BUG</li>";
    } else if (bugs[i] == 1) {
      scores.innerHTML += "<li>" + joueurs[i] + " : 1 BUG</li>";
    } else {
      scores.innerHTML += "<li>" + joueurs[i] + " : " + bugs[i] + " BUGS</li>";
    }
  }
}

function finRound() {
  afficherScores();

  if (round == 6) {
    // c'est la fin de la partie, on cherche qui a le moins de bugs
    let gagnant = 0;
    for (let i = 1; i < joueurs.length; i++) {
      if (bugs[i] < bugs[gagnant]) {
        gagnant = i;
      }
    }
    // on regarde si quelqu'un d'autre a le meme nombre de bugs
    let egalite = false;
    for (let i = 0; i < joueurs.length; i++) {
      if (i != gagnant && bugs[i] == bugs[gagnant]) {
        egalite = true;
      }
    }

    if (egalite == true) {
      titreFin.textContent = "FIN DE LA PARTIE · ÉGALITÉ !";
    } else {
      titreFin.textContent = "FIN DE LA PARTIE · " + joueurs[gagnant] + " GAGNE !";
    }
    btnSuivant.textContent = "NOUVELLE PARTIE";
  } else {
    titreFin.textContent = "FIN DU ROUND " + round;
    btnSuivant.textContent = "LANCER LE ROUND " + (round + 1);
  }

  afficherEcran("fin");
}

btnSuivant.addEventListener("click", function () {
  if (round == 6) {
    // nouvelle partie
    listeNoms.innerHTML = "";
    btnCommencer.style.display = "none";
    afficherEcran("joueurs");
  } else {
    round = round + 1;
    preparerRound();
  }
});


// au debut on affiche l'ecran des joueurs
afficherEcran("joueurs");
