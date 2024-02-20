export default function Scoreboard(props) {
    const {correctGuesses, maxGuesses} = props;
    return (
        <div>
            <h2>Scoreboard</h2>
            <p>{`You guessed ${correctGuesses} / ${maxGuesses}, keep going !`}</p>
        </div>
    )
}