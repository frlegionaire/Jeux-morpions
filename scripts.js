
const cases = document.querySelectorAll('.case'); 


let choixJoueur = true; 
let etats = Array(9).fill(false); 

function checkWinner() {
    const combinaisonsGagnantes = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6], 
    ];

    const images = Array.from(cases).map(c => c.style.backgroundImage);

    for (let combinaison of combinaisonsGagnantes) {
        const [a, b, c] = combinaison;
        if (
            images[a] && 
            images[a] === images[b] && 
            images[b] === images[c] 
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
    etats.fill(false); 
    cases.forEach(caseElement => {
        caseElement.style.backgroundImage = ''; 
    });
}



cases.forEach(caseElement => {
    caseElement.addEventListener('click', handleClick);
});
