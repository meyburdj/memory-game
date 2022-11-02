"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}
console.log(colors);

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  let cardClicked = 0;
  let cardColor = undefined;
  let cardLast = undefined;

  for (let color of colors) {
    const card = document.createElement("div");
    card.style.backgroundColor = 'black';

    card.addEventListener("click", handleCardClick)
    function handleCardClick() {

      if (cardClicked === 0) {
        card.style.backgroundColor = `${color}`;
        cardColor = `${color}`
        cardClicked++
        cardLast = card;
        console.log(cardClicked);
        console.log(cardColor);
        console.log(cardLast)
      }


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

      else if (cardClicked === 1 && cardColor === color && card !== cardLast) {
        card.style.backgroundColor = `${color}`;
        card.removeEventListener("click", handleCardClick);
        cardLast.removeEventListener("click", handleCardClick);
        cardColor = undefined;
        cardClicked = 0;
        cardLast = undefined;

      }

    };
    gameBoard.appendChild(card);
  }

}

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