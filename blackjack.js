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
      hand: [],
      // drawCard: this.accelerate
      // hand: this.getRandom(),
      // drawCard: ()=>{}
    };
  }
  drawCard() {
    let array = [];
    const allDecks = getDeck();
    array.push(allDecks[Math.floor(Math.random() * allDecks.length)]);
    this.state.hand.push(...array);
  }
  // accelerate() {
  //   console.log("FVGD")
  //   const allDecks = getDeck()
  //   let array = [];
  //   console.log(this.state.hand)
  //   // this.setState({ hand: "gyu" })
  //   // array.push(allDecks[Math.floor(Math.random()*allDecks.length)])
  //   console.log(array)
  //   console.log(`${this.state.name} moving to ${allDecks[0].suit}`)
  // }
  render() {
    return {
      name,
      hand
    }
  }
}; //TODO

const result = new CardPlayer("Paul");
result.drawCard()
result.drawCard()
console.log(result)

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
  let total = {
    total: 0,
    isSoft: false
  }
  hand.map((item)=>{
    total.total = total.total + item.val
    if(item.displayVal == "Ace") {
      total.isSoft = true
    }
  })
  return total
}
dealer.drawCard()
dealer.drawCard()
console.log(calcPoints(dealer.state?.hand))

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
  console.log(playerScore, dealerScore)
  return `players score: ${playerScore} and dealer score ${dealerScore} ${playerScore > dealerScore ? "player wins" : playerScore < dealerScore ? "dealer wins" : "game is a tie"}`
}

console.log(determineWinner(calcPoints(player.state.hand).total, calcPoints(dealer.state.hand).total))

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
  console.log(player)
  const displayHand = player.state.hand.map((card) => card.displayVal);
  document.getElementById("display").innerHTML = `${player.state.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.state.hand).total})`;
  console.log(`${player.state.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.state.hand).total})`);
}

showHand(player.state.hand)

const automaticWin = (player, dealer) => {
  let playerTotal = 0;
  let dealerTotal = 0;
  player.map(item=>(
    item.val + playerTotal
  ))
  dealer.map(item=>(
    item.val + dealerTotal
  ))
  if(playerTotal==21) {
    console.log("player wins")
  }
  if(dealerTotal==21) {
    console.log("player wins")
  }
}

automaticWin(player.state, dealer.state)

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
console.log(startGame());