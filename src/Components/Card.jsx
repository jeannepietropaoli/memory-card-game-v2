export default function Card(props) {
    const { pokemon } = props;
    return (
        <li className="card" key={pokemon.id}>
          <img src={pokemon.url} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </li>
      )
}