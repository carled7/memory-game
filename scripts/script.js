const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";
const FLIP = 'flip;'


startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
    //console.log(game.cards);
}

function initializeCards() {
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    });
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function isGameOver() {
    if(game.finishGame == 10){
        let gameOverScreen = document.getElementById("gameOver");
        gameOverScreen.style.display = "flex";
    }
}
function flipCard() {

    if (game.setCard(this.id)) {
        this.classList.add("flip");
        //console.log(this.secondCard.icon);

        if (game.checkMatch()) {
            game.clearCards();
            game.finishGame++;
            isGameOver();
        } else {
            setTimeout(() => {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
                //console.log(firstCardView);
                firstCardView.classList.remove("flip");
                secondCardView.classList.remove("flip");
                game.unFlipCards();
            }, 800);
        }

    }
}
function restart(){
    game.finishGame = 0;
    game.clearCards();

    for(side of game.cards){
        let flippedCards = document.getElementById(side.id);
        flippedCards.classList.remove("flip");
        side.flipped = false;
    }
    
    let gameOverScreen = document.getElementById("gameOver");
    gameOverScreen.style.display = "none";

    startGame();
}