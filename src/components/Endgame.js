function Endgame(props) {
    return (
        <div id="endgame" className="message flex flex-c justify-center align-center gap-15 text-center">
            <div>Congratulations, you completed your journey!</div>
            <div><button onClick={props.resetGame}>Play again</button></div>
        </div>
    )
}

export { Endgame }