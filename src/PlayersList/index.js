import React, { useEffect, useState } from 'react';
import Player from '../Player';
import { players, gameStatuses } from '../../constants';
import './PlayersList.css';

const PlayersList = (props) => {
  const { shuffledDeck, setShuffledDeck, setGameStatus } = props;
  const [playersObj, setPlayersObj] = useState({});

  useEffect(() => {
    const obj = {}
    players.forEach(player => {
      obj[player] = {
        name: `Player ${player}`,
        currentStreak: [],
      };
    });
    setPlayersObj(obj);
  }, []);

  const [currentTurn, setCurrentTurn] = useState(players[0]);

  const playTurn = () => {
    const card = shuffledDeck.pop();
    setShuffledDeck(shuffledDeck);

    const currentPlayer = playersObj[currentTurn];
    let { currentStreak } = currentPlayer;
    if(currentStreak.length
      && card.value !== currentStreak[currentStreak.length - 1].value + 1) {
      currentStreak = [];
    }
    currentStreak.push(card);

    setPlayersObj({
      ...playersObj,
      [currentTurn]: {
        ...currentPlayer,
        currentStreak,
      },
    })

    // check if player wins else pass turn to next player
    if(currentStreak.length === 4) {
      setGameStatus(gameStatuses['ENDED'], currentPlayer.name);
    } else {
      setCurrentTurn((3 - currentTurn).toString());
    }

    //game draw
    if(shuffledDeck.length === 0) {
      setGameStatus(gameStatuses['ENDED']);
    }
  }

  const renderPlayers = () => {
    return Object.keys(playersObj).map(player => (
      <Player
        name={playersObj[player].name}
        currentStreak={[...playersObj[player].currentStreak]}
        key={player}
      />
    ));
  }

  return Object.keys(playersObj).length ? (
    <div className="players-list-wrapper">
      <div>Current Turn: {playersObj[currentTurn].name}</div>
      <button onClick={() => playTurn()}>Pick Card</button>
      <div className="players-list">
        {renderPlayers()}
      </div>
    </div>
  ) : null;
}

export default PlayersList;
