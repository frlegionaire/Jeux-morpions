
const cases = document.querySelectorAll('.case'); // Liste de toutes les cases


let choixJoueur = true; // True = joueur avec croix, False = joueur avec rond
let etats = Array(9).fill(false); // Tableau pour suivre si une case est utilisée

function checkWinner() {
    const combinaisonsGagnantes = [
        [0, 1, 2], // Ligne 1
        [3, 4, 5], // Ligne 2
        [6, 7, 8], // Ligne 3
        [0, 3, 6], // Colonne 1
        [1, 4, 7], // Colonne 2
        [2, 5, 8], // Colonne 3
        [0, 4, 8], // Diagonale principale
        [2, 4, 6], // Diagonale secondaire
    ];

    const images = Array.from(cases).map(c => c.style.backgroundImage);

    for (let combinaison of combinaisonsGagnantes) {
        const [a, b, c] = combinaison;
        if (
            images[a] && // Vérifie si une image est présente
            images[a] === images[b] && // Vérifie si les images correspondent
            images[b] === images[c] // Vérifie si les trois images correspondent
        ) {
            return images[a].includes('croix.png') ? 'croix' : 'rond';
        }
    }
    return null; 
}

function handleClick(event) {
    const caseElement = event.target; 
    const index = Array.from(cases).indexOf(caseElement); 

    if (!etats[index]) { 
        caseElement.style.backgroundImage = choixJoueur ? "url('croix.png')" : "url('rond.png')";
        caseElement.style.backgroundSize = "cover";
        caseElement.style.backgroundPosition = "center";
        caseElement.style.backgroundRepeat = "no-repeat";

      
        etats[index] = true;

        const gagnant = checkWinner();
        if (gagnant) {
            setTimeout(() => alert(`Le joueur avec les ${gagnant} a gagné !`), 100);
            resetGame();
        } else {
            choixJoueur = !choixJoueur;
        }
    }
}


function resetGame() {
    choixJoueur = true; 
    etats.fill(false); // Vide l'état des cases
    cases.forEach(caseElement => {
        caseElement.style.backgroundImage = ''; 
    });
}


// Attache l'événement clic à chaque case
cases.forEach(caseElement => {
    caseElement.addEventListener('click', handleClick);
});
