/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ["hearts", "spades", "clubs", "diamonds"]
  let deck = []
  suits.map(item => {
    for (let x = 1; x <= 13; x++) {
      let displayVal = ""
      switch (x) {
        case 1:
          displayVal = "Ace"
          break;
        case 2:
        case 3:
        case 4:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          displayVal = "J"
          break;
        case 11:
          displayVal = "Jack"
          break;
        case 12:
          displayVal = "Queen"
          break;
        case 13:
          displayVal = "King"
          break;
        default:
          break;
      }
      const card = {
        val: x,
        displayVal: displayVal,
        suit: item
      }
      if(displayVal === "Ace") {
        card.val = 11
      } else if(displayVal === "Jack") {
        card.val = 10
      } else if(displayVal === "Queen") {
        card.val = 10
      } else if(displayVal === "King") {
        card.val = 10
      }
      // console.log(card)
      deck.push(card)
    }
  })
  return deck
}

// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);