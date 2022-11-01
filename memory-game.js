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

    card.addEventListener("click", function () {
      card.style.backgroundColor = `${color}`;
      cardClicked++;
      if (cardClicked === 1) {
        cardColor = `${color}`
      }
      console.log(cardLast)
      console.log(cardColor);
      console.log(cardClicked);

      if (cardClicked === 2 && cardColor !== color) {
        // setTimeout(() => {
        card.style.backgroundColor = "black";
        cardLast.style.backgroundColor = "black";
        // }, 1000);


      }
      if (cardClicked === 2 && cardColor === color) {
        //remove eventlistener

      }
      if (cardClicked === 2) {
        cardClicked = 0;
        cardColor = undefined;
      }
      cardLast = card;
      // cardColor = `${color}`
      console.log(cardColor)
    });
    gameBoard.appendChild(card);
  }
  console.log(cardColor);
  console.log(cardClicked);
}

/** Flip a card face-up. */

function flipCard(card) {

}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
}
