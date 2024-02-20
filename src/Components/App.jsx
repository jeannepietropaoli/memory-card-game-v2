import { useState, useEffect } from 'react';
import '../style/App.css';
import CardList from './CardList';
import Scoreboard from './Scoreboard';
import Modal from './Modal';
import EndOfGameMessage from './EndOfGameMessage';

function App() {
  const numberOfCards = 8;
  const maxPokemonId = 1000;
  const [data, setData] = useState(null);
  const [selectedCardsIds, setSelectedCardsIds] = useState([]);
  const [endOfGame, setEndOfGame] = useState(false);
  const [highestScore, setHighestScore] = useState(getStoredHighestScore());
  const [idsArray, setIdsArray] = useState(getRandomIdsArray());
  
  function getStoredHighestScore() {
    return localStorage.getItem('highestScore') || 0;
  }

  const setStoredHighestScore = (score) => {
    localStorage.setItem('highestScore', score);
    setHighestScore(score);
  }

  function getRandomId() {
    return Math.floor(Math.random() * maxPokemonId);
  }

  function getRandomIdsArray() {
    const idsSet = new Set();
    while(idsSet.size < numberOfCards) {
      idsSet.add(getRandomId());
    }
    return Array.from(idsSet);
  }

  const isGameWon = () => selectedCardsIds.length === numberOfCards;

  const selectCard = (cardId => {
    selectedCardsIds.includes(cardId) 
      ? setEndOfGame(true) 
      : setSelectedCardsIds([...selectedCardsIds, cardId])
    })

  const resetGame = () => {
    setSelectedCardsIds([]);
    setEndOfGame(false);
  }

  const changePokemonSet = () => {
    setData(null);
    setIdsArray(getRandomIdsArray);
    resetGame();
  }

  useEffect(() => {
    if (selectedCardsIds.length === numberOfCards) {
      setEndOfGame(true);
    }
  }, [selectedCardsIds]);

  useEffect(() => {
    Promise.all(idsArray.map(id => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then(data => {
          return ({
            name: data.name,
            id: data.id,
            url: data.sprites.front_default
          })
    })
    }))
    .then(names => setData(names))
    .catch(error => console.error(`Error fetching data: ${error}`))
  }, [idsArray]);

  useEffect(() => {
    if(endOfGame) {
      const currentGameScore = selectedCardsIds.length;
      currentGameScore > highestScore && setStoredHighestScore(currentGameScore);
    }
  }, [endOfGame, selectedCardsIds, highestScore]);

  return (
    <div className='app'>
      <h1>Memory Game App</h1>
      <Scoreboard correctGuesses={selectedCardsIds.length} maxGuesses={numberOfCards} highestScore={highestScore} />
      <CardList data={data} selectCard={selectCard} selectedCardsIds={selectedCardsIds} />
      {endOfGame 
        && <Modal resetGame={resetGame} changePokemonSet={changePokemonSet}>
          <EndOfGameMessage isGameWon={isGameWon()} />
          <Scoreboard correctGuesses={selectedCardsIds.length} maxGuesses={numberOfCards} highestScore={highestScore} />
        </Modal>
      }
    </div>
  )
}

export default App
