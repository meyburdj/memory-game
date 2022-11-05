"use strict";



/** Memory game: find matching pairs of cards and flip both of them. */


//all of the eventual cards
const FOUND_MATCH_WAIT_MSECS = 1000;
const IMAGES = [
  "assets/smol_1.png", "assets/smol_2.png", "assets/smol_3.png",
  "assets/smol_4.png", "assets/smol_5.png", "assets/smol_6.png",
  "assets/smol_1.png", "assets/smol_2.png", "assets/smol_3.png",
  "assets/smol_4.png", "assets/smol_5.png", "assets/smol_6.png"
];

//stored global variables 
const images = shuffle(IMAGES);
let score = 0;
let scoreHi = 0;
let time = 0;
let lockBoard = false;
let correctGuess = 0;

// create the game design. assign images to cards. create scoreboard
let startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  createGameStart();
  createCards(images);
  createScoreBoard();
  let startSequence = document.getElementById("start-sequence");
  startSequence.remove();
})


/** Shuffle array items in-place and return shuffled array. */

//randomly shuffle the items an assign to cards
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
  let gameStart = 0;


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
        gameStart++;
        if (gameStart === 1) {
          setInterval(timerFunction, 1000);
        }

      }

      //if second card flipped isn't a match, unflip both
      else if (cardClicked === 1 && cardImage !== image) {
        lockBoard = true;

        card.src = `${image}`;
        let angryCatSound = new Audio('assets/angry_cat.wav');
        angryCatSound.volume = .5;
        angryCatSound.play();
        setTimeout(function () {
          card.src = unflipImg
          cardLast.src = unflipImg;
          cardImage = undefined;
          cardClicked = 0;
          cardLast = undefined;
          lockBoard = false;
        }, 1000);
        score++;
      }

      //if second card flipped is a match leave flipped
      else if (cardClicked === 1 && cardImage === image && card !== cardLast) {
        card.src = `${image}`;
        let happyCatSound = new Audio('assets/happy_cat.mp3');
        happyCatSound.play();
        card.removeEventListener("click", handleCardClick);
        cardLast.removeEventListener("click", handleCardClick);
        cardImage = undefined;
        cardClicked = 0;
        cardLast = undefined;
        correctGuess++;
        score++;
      }

      document.getElementById("score-text").innerHTML = "Guesses: " + score;

    };
    gameBoard.appendChild(card);
  }

}


function timerFunction() {
  if (correctGuess === 6) {
    return;
  }
  time++;
  document.getElementById("timer").innerHTML = "Time: " + time + " seconds"
}


function createScoreBoard() {
  const scoreBoard = document.getElementById("scores");
  let scoreBoardDiv = document.createElement("div");
  let scoreText = document.createElement("p");
  scoreText.setAttribute("id", "score-text");
  let scoreHiText = document.createElement("p");
  let timerText = document.createElement("p");
  timerText.setAttribute("id", "timer");
  scoreHiText.setAttribute("id", "score-hi-text");
  scoreText.innerHTML = "Guesses: " + score;
  scoreHiText.innerText = scoreHi;
  timerText.innerHTML = "Time: " + time + " seconds";
  scoreBoardDiv.appendChild(timerText);
  scoreBoardDiv.appendChild(scoreText);
  // scoreBoardDiv.appendChild(scoreHiText);
  scoreBoard.appendChild(scoreBoardDiv);
}

function createGameStart() {
  let containerScore = document.createElement("div");
  containerScore.className = "container bg-dark";
  let scoreDiv = document.createElement("h3");
  scoreDiv.className = "text-center";
  scoreDiv.id = "scores";
  scoreDiv.style = "color:yellow";

  let containerGame = document.createElement("div");
  containerGame.className = "container";
  containerGame.style = "max-width: 750px; border: 15px";

  let gameDiv = document.createElement("div");
  gameDiv.className = "row row-cols-4";
  gameDiv.id = "game";

  containerScore.appendChild(scoreDiv);
  containerGame.appendChild(gameDiv);
  let backgroundDiv = document.getElementById("background");
  backgroundDiv.appendChild(containerScore);
  backgroundDiv.appendChild(containerGame);
}

