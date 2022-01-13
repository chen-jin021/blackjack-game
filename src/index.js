import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

//-------------------------------------------------------start of setting up our deck of cards
const initDeck = () => {
  const suits = ["♣", "♦", "♥", "♠"];
  const values = new Array(9).fill(null).map((_, i) => i + 2);

  const deck = suits.reduce((deckAccum, suit) => {
    const allOfSuit = values.map((val) => {
      return { val, suit };
    });
    return [...deckAccum, ...allOfSuit];
  }, []);

  //shuffle the cards
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);
    const tmp = deck[i];
    deck[i] = deck[j];
    deck[j] = tmp;
  }
  return deck;
};

//afterall, deck will produce [{val:2, suit:'♥'}, {...}, ...]

//deal initial 2 cards
const deck = initDeck();
const hand = [];

hand.push(deck.pop());
hand.push(deck.pop());

const initialState = { deck, hand };
//-------------------------------------------------------end of setting up our deck of cards

// also note we do this as functions are hosited
const App = () => {
  //useState => accepts initial value for state
  //give back the value of the state some func for setting state

  //game <-- {deck: [...], hand: [...]}
  //set function given back REPLACES the state
  const [game, setGame] = useState(initialState);
  //game {deck: []}

  //once hit button is clicked - new card dealt
  function f() {
    // console.log("hit");
    const newGame = {
      deck: game.deck.slice(0, game.deck.length - 2),
      hand: [
        ...game.hand,
        ...game.deck.slice(game.deck.length - 1, game.deck.length),
      ],
    };
    setGame(newGame); //set it to the new state above
  }
  const n = game.hand.reduce((total, card) => {
    return total + card.val;
  }, 0);
  return (
    <div>
      <Score score={n} />
      <Hand cards={game.hand} />
      <HitButton handleClick={f} />
    </div>
  );
};

const Score = (props) => {
  return <h1>{props.score}</h1>;
};

const HitButton = (props) => {
  return <button onClick={props.handleClick}>Hit!</button>;
};

const Card = (props) => {
  return (
    <div className="card">
      {props.val}
      {props.suit}
    </div>
  );
};

const Hand = (props) => {
  //create array of card components based on cards passed in as props
  //props.cards = [{val, suit}]
  //map has optional index as arg <- i is pos in original array
  const cardComponents = props.cards.map((card, i) => {
    return <Card val={card.val} suit={card.suit} key={i} />;
  });
  return (
    <div classname="hand">
      {/* this returns an array of ReactElement Card */}
      {cardComponents}
    </div>
  );
};

//rendering
ReactDOM.render(<App />, document.getElementById("root"));
