"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
let score = 0;
console.log(score)
let scoreHi = 0;
let time = 0;

createCards(colors);
createScoreBoard();
console.log(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

//create cards. respond to first click, second click matchd, and second click unmatched.

function createCards(colors) {
  const gameBoard = document.getElementById("game");



  let cardClicked = 0;
  let cardColor = undefined;
  let cardLast = undefined;


  for (let color of colors) {
    //create initial unflipped cards
    const card = document.createElement("div");
    card.style.backgroundColor = 'black';

    //create three click pathways
    card.addEventListener("click", handleCardClick)
    function handleCardClick() {

      //action if first card flipped
      if (cardClicked === 0) {
        card.style.backgroundColor = `${color}`;
        cardColor = `${color}`
        cardClicked++
        cardLast = card;
        console.log(cardClicked);
        console.log(cardColor);
        console.log(cardLast)
      }

      //if second card flipped isn't a match, unflip both
      else if (cardClicked === 1 && cardColor !== color) {
        card.style.backgroundColor = `${color}`;
        setTimeout(function () {
          card.style.backgroundColor = "black";
          cardLast.style.backgroundColor = "black";
          cardColor = undefined;
          cardClicked = 0;
          cardLast = undefined;
        }, 1000);
      }

      //if second card flipped is a match leave flipped
      else if (cardClicked === 1 && cardColor === color && card !== cardLast) {
        card.style.backgroundColor = `${color}`;
        card.removeEventListener("click", handleCardClick);
        cardLast.removeEventListener("click", handleCardClick);
        cardColor = undefined;
        cardClicked = 0;
        cardLast = undefined;
      }
      score++;
      document.getElementById("score-text").innerHTML = "Amount of Guesses: " + score;
      console.log(score);

    };
    gameBoard.appendChild(card);
  }

}


function createScoreBoard() {
  const scoreBoard = document.getElementById("scores");
  let scoreBoardDiv = document.createElement("div");
  let scoreText = document.createElement("p");
  scoreText.setAttribute("id", "score-text");
  let scoreHiText = document.createElement("p");
  let timer = document.createElement("p");
  timer.setAttribute("id", "timer");
  scoreHiText.setAttribute("id", "score-hi-text");
  scoreText.innerHTML = "Amount of Guesses: " + score;
  scoreHiText.innerText = scoreHi;
  timer.innerHTML = "Time: " + time + " seconds";
  scoreBoardDiv.appendChild(timer);
  scoreBoardDiv.appendChild(scoreText);
  scoreBoardDiv.appendChild(scoreHiText);
  scoreBoard.appendChild(scoreBoardDiv);
}

// function clock() {
setInterval(function () { time++; document.getElementById("timer").innerHTML = "Time: " + time + " seconds" }, 1000);



// function createScoreBoard(score, hiScore) {
//   let scoreBoard = document.createElement("div");
//   let score = document.createElement("p");
//   let hiScore = document.createElement("p");
//   score.value = score;
//   hiScore.value = hiScore;
//   scoreBoard.appendChild(score);
//   scoreBoard.appendChild(hiScore);
//   gameBoard.appendChild(scoreBoard);
// }


















/** Flip a card face-up. */

function flipCard(card) {

}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */

// function handleCardClick(evt) {
//   // ... you need to write this ...
// }