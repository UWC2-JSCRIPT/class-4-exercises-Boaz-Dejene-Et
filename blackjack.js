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
      deck.push(card)
    }
  })
  return deck
}

const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.state = {
      name: name,
      hand: this.getRandom(),
      drawCard: this.accelerate
      // hand: this.getRandom(),
      // drawCard: ()=>{}
    };
  }
  getRandom() {
    let array = [];
    const allDecks = getDeck()
    array.push(allDecks[Math.floor(Math.random()*allDecks.length)])
    return array
  }
  accelerate() {
    console.log("FVGD")
    const allDecks = getDeck()
    let array = [];
    console.log(this.state.hand)
    // this.setState({ hand: "gyu" })
    // array.push(allDecks[Math.floor(Math.random()*allDecks.length)])
    console.log(array)
    console.log(`${this.state.name} moving to ${allDecks[0].suit}`)
  }
  render() {
    return {
      drawCard,
      name,
      hand
    }
  }
}; //TODO

const result = new CardPlayer("Paul");
console.log(result)
result.accelerate()

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Player"); // TODO
const player = new CardPlayer("Dealer"); // TODO

console.log(dealer)
console.log(player)

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
  if(hand[0].displayVal == "Ace") {
    return {
      total: hand[0].val,
      isSoft: true
    }
  } else {
    return {
      total: hand[0].val,
      isSoft: false
    }
  }
  // hand.map((item)=>)
}

console.log(calcPoints(dealer.state.hand))

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  if(calcPoints(dealerHand).isSoft == true){
    return true
  } else {
    return false
  }
}

console.log(dealerShouldDraw(dealer.state.hand))

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE

}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
// console.log(startGame());