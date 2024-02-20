export default function Scoreboard(props) {
    const {correctGuesses, maxGuesses, highestScore } = props;
    return (
        <div>
           <p>{`Score : ${correctGuesses} / ${maxGuesses}`}</p>
           <p>{`Highest score : ${highestScore}`}</p>
        </div>
    )
}