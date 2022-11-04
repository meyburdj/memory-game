"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const IMAGES = [
  "assets/smol_1.png", "assets/smol_2.png", "assets/smol_3.png",
  "assets/smol_4.png", "assets/smol_5.png", "assets/smol_6.png",
  "assets/smol_1.png", "assets/smol_2.png", "assets/smol_3.png",
  "assets/smol_4.png", "assets/smol_5.png", "assets/smol_6.png"
];

const images = shuffle(IMAGES);
let score = 0;
console.log(score)
let scoreHi = 0;
let time = 0;
let lockBoard = false;
let correctGuess = 0;

createCards(images);
createScoreBoard();
console.log(images);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

//create cards. respond to first click, second click matchd, and second click unmatched.

function createCards(images) {

  const gameBoard = document.getElementById("game");



  let cardClicked = 0;
  let cardImage = undefined;
  let cardLast = undefined;


  for (let image of images) {
    //create initial unflipped cards
    const card = document.createElement("img");
    let unflipImg = "assets/laser_cat.png"
    card.src = unflipImg
    card.style = "margin-bottom: 10px;"



    //create three click pathways
    card.addEventListener("click", handleCardClick)
    function handleCardClick() {
      if (lockBoard) return;
      //action if first card flipped
      if (cardClicked === 0) {
        card.src = `${image}`;
        cardImage = `${image}`
        cardClicked++
        cardLast = card;
        console.log(cardClicked);
        console.log(cardImage);
        console.log(cardLast)
      }

      //if second card flipped isn't a match, unflip both
      else if (cardClicked === 1 && cardImage !== image) {
        lockBoard = true;
        card.src = `${image}`;
        setTimeout(function () {
          card.src = unflipImg
          cardLast.src = unflipImg;
          cardImage = undefined;
          cardClicked = 0;
          cardLast = undefined;
          lockBoard = false;
        }, 1000);

      }

      //if second card flipped is a match leave flipped
      else if (cardClicked === 1 && cardImage === image && card !== cardLast) {
        card.src = `${image}`;
        card.removeEventListener("click", handleCardClick);
        cardLast.removeEventListener("click", handleCardClick);
        cardImage = undefined;
        cardClicked = 0;
        cardLast = undefined;
        correctGuess++;
        if (correctGuess === 6) {
          clearInterval(timer);
        }
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
  // scoreBoardDiv.appendChild(scoreHiText);
  scoreBoard.appendChild(scoreBoardDiv);
}

// function clock() {

let timer = setInterval(function () { time++; document.getElementById("timer").innerHTML = "Time: " + time + " seconds" }, 1000);
timer;



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