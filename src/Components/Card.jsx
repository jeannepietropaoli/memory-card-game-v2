import '../style/Card.css';

export default function Card(props) {
    const { pokemon, selectCard } = props;
    return (
        <li className="card" key={pokemon.id} onClick={() => selectCard(pokemon.id)}>
          <figure>
              <img src={pokemon.url} alt={pokemon.name} />
              <figcaption>{pokemon.name}</figcaption>
          </figure>
        </li>
      )
}