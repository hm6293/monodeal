import React, { useEffect, useState } from 'react';
import { gameStatuses } from '../constants';
import './App.css';
// import PlayersList from '../PlayersList';

const deck = [];
const MAX_PLAYERS = 5;

const actionCards = {
  DEAL_BREAKER: 2,
  DEBT_COLLECTER: 3,
  JUST_SAY_NO: 3,
  SLY_DEAL: 3,
  FORCE_DEAL: 4,
  ITS_MY_BIRTHDAY: 3,
  PASS_GO: 10,
  HOUSE: 3,
  HOTEL: 3,
  DOUBLE_THE_RENT: 2,
};

const propertyCards = {
  GREEN: 3,
  DARK_BLUE: 2,
  LIGHT_BLUE: 3,
  RED: 3,
  UTILITY: 2,
  YELLOW: 3,
  ORANGE: 3,
  PURPLE: 3,
  BROWN: 2,
  RAILROAD: 4,
};

const propertyWildCards = {
  DARK_BLUE_AND_GREEN: 1,
  LIGHT_BLUE_AND_BROWN: 1,
  TEN_COLOR: 2,
  ORANGE_AND_PURPLE: 2,
  GREEN_AND_RAILROAD: 1,
  LIGHT_BLUE_AND_RAILROAD: 1,
  UTILITY_AND_RAILROAD: 1,
  YELLOW_AND_RED: 2,
};

const rentCards = {
  TEN_COLOR_RENT: 3,
  DARK_BLUE_AND_GREEN_RENT: 2,
  LIGHT_BLUE_AND_BROWN_RENT: 2,
  ORANGE_AND_PURPLE_RENT: 2,
  UTILITY_AND_RAILROAD_RENT: 2,
  YELLOW_AND_RED_RENT: 2,
};

const moneyCards = {
  TEN_MILLION: 1,
  FIVE_MILLION: 2,
  FOUR_MILLION: 3,
  THREE_MILLION: 3,
  TWO_MILLION: 5,
  ONE_MILLION: 6,

}

const createDeck = () => {
  [actionCards, propertyCards, propertyWildCards, rentCards, moneyCards].forEach(cardGroup => {
    Object.keys(cardGroup).forEach(cardKey => {
      for(let i = 0; i < cardGroup[cardKey]; i++) {
        deck.push(cardKey);
      }
    });
  });
  console.log(deck);
}

const App = () => {

  useEffect(() => {
    createDeck();
  }, []);

  
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState([2]);
  const [gameStatus, setGameStatus] = useState(gameStatuses['NOT_STARTED']);
  // const [winner, setWinner] = useState('');

  const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    };
    setShuffledDeck([...deck]);
  }
  
  const startGame = () => {
    shuffleDeck();
    setGameStatus(gameStatuses['ONGOING']);
  }

  const renderPlayerChooser = () => {
    const players = [];
    for(let i = 2; i <= MAX_PLAYERS; i++) {
      players.push(
      <button value={i} onClick={() => setNumberOfPlayers(i)}>{i}</button>
      )
    }
    return players;
  }

  // const updateDeck = (updatedDeck) => {
  //   setShuffledDeck([...updatedDeck]);
  // }

  // const updateGameStatus = (status, winner) => {
  //   setGameStatus(status);
  //   if(winner) {
  //     setWinner(winner);
  //   }
  // }

  return (
    <div className="app">
      { gameStatus === gameStatuses['NOT_STARTED'] && (
        <div>
          {renderPlayerChooser()}
          <button className="start-game" onClick={() => startGame()}>Start Game</button>
        </div>
      )}
      {/* {
        gameStatus === gameStatuses['ONGOING'] && (
          <div>
            <div>Remaining Cards in Deck: {`(${shuffledDeck.length})`}</div>
            <div className="back-card"></div>
            <PlayersList
              shuffledDeck={shuffledDeck}
              setShuffledDeck={updateShuffledDeck}
              setGameStatus={updateGameStatus}
            />
          </div>
        )
      }
      {
        gameStatus === gameStatuses['ENDED'] && (
          <div>
            <div>
              {winner ? `${winner} wins !!` : 'Match draw'}
            </div>
            <button onClick={() => startGame()}>Restart game</button>
          </div>
        )
      } */}
    </div>
  );
}

export default App;
