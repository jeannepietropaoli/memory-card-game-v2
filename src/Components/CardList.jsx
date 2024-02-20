import Card from './Card';

export default function CardList(props) {
    const { data } = props;
    return (
        <ul className='cards'>
          {data ?
            data.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)
            : <li>Loading...</li>
          }
        </ul>
      )
}