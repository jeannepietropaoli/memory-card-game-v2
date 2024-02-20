import { useState, useEffect } from 'react';
import '../style/App.css';
import CardList from './CardList';
import Scoreboard from './Scoreboard';
import Modal from './Modal';

function App() {
  const [data, setData] = useState(null);
  const [selectedCardsIds, setSelectedCardsIds] = useState([]);
  const [endOfGame, setEndOfGame] = useState(false);
  const numberOfCards = 8;
  const maxPokemonId = 1000;
  
  const isGameWon = () => {
    return (selectedCardsIds.length === numberOfCards)
  }

  const getRandomId = () => Math.floor(Math.random() * maxPokemonId);

  const getRandomIdsArray = () => {
    const idsSet = new Set();
    while(idsSet.size < numberOfCards) {
      idsSet.add(getRandomId());
    }
    return Array.from(idsSet);
  }

  const [idsArray, setIdsArray] = useState(getRandomIdsArray());

  const selectCard = (cardId => {
    if (selectedCardsIds.includes(cardId)) {
      console.log('you just lost')
      setEndOfGame(true);
    }
    else {
      console.log('keep going')
      setSelectedCardsIds([...selectedCardsIds, cardId])
    }
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
      console.log('you won');
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

  return (
    <>
      <h1>Memory Game App</h1>
      <Scoreboard correctGuesses={selectedCardsIds.length} maxGuesses={numberOfCards} />
      <CardList data={data} selectCard={selectCard} />
      {endOfGame 
        && <Modal resetGame={resetGame} changePokemonSet={changePokemonSet}>
          <p>{isGameWon() ? "Congratulations! You won!" : "You lost"}</p>
        </Modal>
      }
    </>
  )
}

export default App
