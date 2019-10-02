
var cardList = ["cat", "sheep", "chicken", "dog", "frog", "goose", "lion", "mouse", "pig", "rabbit", "snake", "whale"];
var toCompare = [];
var attempts = 0;
var matches = 0;
var seconds = 0;
var difficulty;
var timer;



document.addEventListener("DOMContentLoaded",function() {
    var header = document.querySelector("header");
    var cardTable = document.querySelector("#card_table");
    var startButton = document.querySelector("button");
    var gameinfo = document.querySelector("#gameinfo");
    var numPairs = document.querySelector("#numPairs");
    var elapsedTime = document.querySelector("#timer");
    var attemptInfo = document.querySelector("#attempts");
    var matchesInfo = document.querySelector("#matches");
    
    
    startButton.addEventListener("click", function() {
        cardTable.style.display = "flex";
        gameinfo.style.display = "flex";
        header.style.display = "none";
        
        difficulty = parseInt(numPairs.value);
        setCards(difficulty);

        timer = setInterval( function() {
            seconds += 1;
            elapsedTime.innerText = "Elapsed Time: " + seconds.toString() + " seconds";
            attemptInfo.innerText = "Attempts: " + attempts.toString();
            matchesInfo.innerText = "Matches: " + matches.toString();
        }, 1000);

        cardTable.scrollIntoView();
    });

    cardTable.addEventListener("click", function() { 
        if (toCompare.length < 2 && event.target.tagName === "DIV") {
            let img = event.target.querySelector("img");
            if (img.style.display === "none") {
                img.style.display = "inline-block";
                toCompare.push(img);
            }
            if (toCompare.length === 2) {
                if (toCompare[0].src !== toCompare[1].src) {
                    attempts += 1;
                    let timeShowCard = setTimeout(function() {
                        toCompare[0].style.display = "none";
                        toCompare[1].style.display = "none";
                        toCompare = [];
                    }, 1000)
                } else if (toCompare[0].src === toCompare[1].src){
                    toCompare = [];
                    attempts += 1;
                    matches += 1;
                }
            }
        } 
        if (matches === parseInt(numPairs.value)) {
            alert("Done!\nAttempts: " + attempts.toString() + "\nMatches: " + matches.toString() + "\nElapsed Time: " + seconds.toString());
            header.style.display = "inline";
            cardTable.style.display = "none";
            gameinfo.style.display = "none";
            clearInterval(timer);
            
            
        }      
    });


    function setCards(num) {
        matches = 0;
        attempts = 0;
        seconds = 0;
        clearInterval(timer);
        

        var cardsToPlay = shuffle(cardList).slice(0,num);

        cardsToPlay = cardsToPlay.concat(cardsToPlay);
        shuffle(cardsToPlay);
        
        //remove cards from previous game
        let cardsOnTable = cardTable.querySelectorAll(".card") 
        for (let i = 0; i < cardsOnTable.length; i++) {
            cardsOnTable[i].remove();
        }
        
        //add shuffled cards to table
        for (let i =0; i < cardsToPlay.length; i++) {
            let card = document.createElement("div");
            card.className = "card"
            let img = document.createElement("img")
            img.style.display = "none"
            img.src = "pictures/" + cardsToPlay[i] + ".png"
            card.appendChild(img);
            cardTable.appendChild(card)
            }
        
        
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;    
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }    
        return array;
      }
});