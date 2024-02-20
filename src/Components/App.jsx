import { useState, useEffect } from 'react';
import '../style/App.css';
import CardList from './CardList';

function App() {
  const [data, setData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const numberOfCards = 8;
  const maxPokemonId = 1000;

  const getRandomId = () => Math.floor(Math.random() * maxPokemonId);

  const getRandomIdsArray = () => {
    const idsSet = new Set();
    while(idsSet.size < numberOfCards) {
      idsSet.add(getRandomId());
    }
    return Array.from(idsSet);
  }

  const idsArray = getRandomIdsArray();

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
  }, []);

  return (
    <>
      <h1>Memory Game App</h1>
      <CardList data={data} />
    </>
  )
}

export default App
