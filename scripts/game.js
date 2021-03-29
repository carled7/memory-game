let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    finishGame: 0,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id == id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            let firstCardView = document.getElementById(this.firstCard.id);
            firstCardView.classList.add("flip");
            //return true;
        } else {
            this.secondCard = card;
            this.firstCard.flipped = true;
            this.lockMode = true;
            //return true;
        }
        while (!this.firstCard || !this.secondCard) {
            return false;
        }
        return true;
    },

    checkMatch: function () {
        let match = this.firstCard.icon === this.secondCard.icon;
        isGameOver();
        return match;       
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unFlipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    createCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards
    },

    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        },
        {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]

    },

    createIdWithTech: function (tech) {

        return tech + parseInt(Math.random() * 1000);

    },

    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },
}