import '../style/Modal.css';

export default function Modal(props) {
    const { resetGame, changePokemonSet, children } = props;
    return (
        <div className='modal-container'>
            <div className="modal">
                <h2>End of Game !</h2>
                <main>{children}</main>
                <button onClick={resetGame}><span>Play again</span></button>
                <button onClick={changePokemonSet}><span>Change Pokemons</span></button>
            </div>
        </div>
    )
}