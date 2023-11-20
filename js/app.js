// Stockage des scores de la partie
let scoreValuePlayerOne = 0;
let scoreValuePlayerTwo = 0;

// Création d'une div avec deux button qui permet de m'etre en place une interface
// pour initialiser une partie
let newGame = document.createElement('div');
newGame.classList.add('absolutBox');
newGame.setAttribute("id","newgame");
const addNewGame = document.getElementById('app');
addNewGame.append(newGame);
const addFontForNewGame= document.createElement('h1');
addFontForNewGame.textContent='Jeu de lancé de dès contre IA';
newGame.append(addFontForNewGame);
const addPForNewGame = document.createElement('p');
addPForNewGame.textContent = "Voulez vous lancer une partie ?";
newGame.append(addPForNewGame)
// button YES
const addButtonYesForNewGame = document.createElement('button')
addButtonYesForNewGame.textContent = "Oui"
addButtonYesForNewGame.classList.add('yes-button');
// button No
newGame.append(addButtonYesForNewGame)
const addButtonNoForNewGame = document.createElement('button')
addButtonNoForNewGame.textContent = "non"
addButtonNoForNewGame.classList.add('no-button');
newGame.append(addButtonNoForNewGame)

// initialisation des deux boards
let secondPlayer = document.createElement('div');
    secondPlayer.classList.add('board');
    secondPlayer.setAttribute('id', 'dealer');
let addSecondDiv = document.getElementById('app');
    addSecondDiv.prepend(secondPlayer)

// Détecté le click pour éxécuté une function pour lancer une partie
const btn = document.querySelector(".yes-button");
btn.addEventListener('click', deleteNewgame);
const reStartBtn = document.createElement('button');
reStartBtn.classList.add('restart-btn');
reStartBtn.textContent ="Lancer une autre partie";
reStartBtn.addEventListener('click', resetGame);

// Function qui reset les infos au click du btn restart
function resetGame() {
    const playerDiv = document.getElementById('player');
    const dealerDiv = document.getElementById('dealer');
    playerDiv.innerHTML = ''; 
    dealerDiv.innerHTML = ''; 

    const scoreElements = document.querySelectorAll('.score-title, .winner, .egal');
    scoreElements.forEach(element => element.remove());
    askForThrowDice()
}

// Function qui supprime NewGameDiv
function deleteNewgame(){
    document.querySelector(".absolutBox").remove(".absolutBox");
    addNewGame.append(reStartBtn)
    askForThrowDice()
}
//  function qui retourne la valeur du PROMPT.

function askForThrowDice (){
        const getInputValue = parseInt(prompt('Combien de lancé aimeriez vous faire ? votre adversaire en feras autant'))
        howManyThrowDice(getInputValue)
}

// Function genere un nombre alea pour la position des images sprite
function GenerateRandomNumber(){
    return  Math.floor(Math.random()* 6) +1;
 }

// Function Lancer plusieurs dès
 function howManyThrowDice(numThrow) {
    // Tableau de score
    const diceValuePlayerOne = [];
    const diceValuePlayerTwo = [];

    // Creation des dès en fonction du nombre de lancé et du nombre généré 
    for (let index = 0; index < numThrow ; index++) {
        // JOUEUR 1
        const randomNumberPlayer1 = GenerateRandomNumber();
        diceValuePlayerOne.push(randomNumberPlayer1);
        const playerOne = document.createElement('div');
        const titlePlayerOne = document.createElement('h2');
        titlePlayerOne.textContent="Joueur";
        titlePlayerOne.classList.add('player-title')
        playerOne.append(titlePlayerOne)
        playerOne.classList.add('dice');
        playerOne.style.backgroundPositionX = - (randomNumberPlayer1 - 1)  * 100 + 'px';
        let addDiv = document.getElementById('player');
        addDiv.append(playerOne);

        // IA BONUS
        const randomNumberPlayer2 = GenerateRandomNumber();
        diceValuePlayerTwo.push(randomNumberPlayer2);
        const secondDice = document.createElement('div');
        secondDice.classList.add('dice')
        secondDice.style.backgroundPositionX = - (randomNumberPlayer2 - 1)  * 100 + 'px';
        const titlePlayerTwo = document.createElement('h2');
        titlePlayerTwo.textContent="IA";
        titlePlayerTwo.classList.add('player-title')
        playerOne.append(titlePlayerTwo)
        const AddSecondDice = document.getElementById('dealer');
        AddSecondDice.append(secondDice); 
        AddSecondDice.append(titlePlayerTwo); 
    }

    // Creation d'un timer de 2secondes entre affichage des dès et resultat gagnant
    setTimeout(function() {
    // Afficher le score du PlayerOne
        let somme1 = diceValuePlayerOne.reduce(function(total, valeurCourante) {
            return total + valeurCourante;
        }, 0);
        
        const textScore = document.createElement('h1');
        textScore.textContent = "Vous avez obtenue  "+ somme1 + " points";
        textScore.classList.add('score-title');
        const addScore = document.getElementById('player');
        addScore.append(textScore);
        
        
        // Afficher le score du playerTwo
        let somme2 = diceValuePlayerTwo.reduce(function(total, valeurCourante) {
            return total + valeurCourante;
        }, 0);
        
        const textScore2 = document.createElement('h1');
        textScore2.textContent = "Vous avez obtenue  "+ somme2 + " points";
        textScore2.classList.add('score-title');
        const addScore2 = document.getElementById('dealer');
        addScore2.append(textScore2);

        // Afficher le winner
        if (somme1 > somme2) {
            const SeeWinner = document.createElement('p');
            SeeWinner.classList.add('winner');
            SeeWinner.textContent = "Winner";
            const addScore = document.getElementById('player');
            addScore.append(SeeWinner);
            scoreValuePlayerOne++;
            console.log( "le score de p1 est de " + scoreValuePlayerOne);
        } else if (somme2 > somme1) {
            const SeeWinner = document.createElement('p');
            SeeWinner.classList.add('winner');
            SeeWinner.textContent = "Winner";
            const addScore2 = document.getElementById('dealer');
            addScore2.append(SeeWinner);
            scoreValuePlayerTwo++;
            console.log("le score de p2 est de " + scoreValuePlayerTwo);
        } else {
            const SeeWinner = document.createElement('p');
            SeeWinner.classList.add('egal');
            SeeWinner.textContent = "égalité";
            const addScore2 = document.getElementById('app');
            addScore2.append(SeeWinner);
        }
        resetScore() 
    }, 500)
    
 }

 function resetScore() {
    // Supprimer tous les éléments avec la classe .score-div
    const existingScoreDivs = document.querySelectorAll('.score-div');
    existingScoreDivs.forEach(scoreDiv => scoreDiv.remove());

    // Créer et afficher le nouveau score
    const lastGameScoresDiv = document.createElement('div');
    lastGameScoresDiv.classList.add('score-div'); // Utilisez la classe .score-div

    const playerScoreElement = document.createElement('p');
    playerScoreElement.textContent = "Score Joueur: " + scoreValuePlayerOne;

    const dealerScoreElement = document.createElement('p');
    dealerScoreElement.textContent = "Score IA: " + scoreValuePlayerTwo;
    
    lastGameScoresDiv.appendChild(dealerScoreElement);
    lastGameScoresDiv.appendChild(playerScoreElement);
    

    document.getElementById('app').appendChild(lastGameScoresDiv);
}




//  Idée a rajouter => 
// ajouter un timer entre le moment ou player1 joue l'apparition du resultat de player 2
// ajouter un bouton qui permet de relancer une partie
// ajouter un tableau qui contient le nombre de Win par player 



 






