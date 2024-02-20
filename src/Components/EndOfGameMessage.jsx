export default function EndOfGameMessage(props) {
    const { isGameWon } = props;

    return (
        <p>{isGameWon ? "Congratulations, you won !" : "Game over !"}</p>
    )
}