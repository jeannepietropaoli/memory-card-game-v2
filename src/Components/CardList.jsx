import Card from './Card';
import '../style/CardList.css';

export default function CardList(props) {
    const { data, selectCard } = props;

    const shuffleArray = (array) => {
        const arrayCopy = array;
        const newArray = [];
        while(arrayCopy.length>0) {
            let randomIndex = Math.floor(Math.random() * array.length);
            newArray.push(arrayCopy.splice(randomIndex, 1)[0]);
        }
        return newArray;
    }

    return (
        <ul className='cards'>
          {data ?
            shuffleArray(data.map(pokemon => {
                return (
                    <Card
                        selectCard={selectCard}
                        key={pokemon.id}
                        pokemon={pokemon}
                    />
                )
            }))
            : <li>Loading...</li>
          }
        </ul>
      )
}