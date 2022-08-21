import { CurrentScore } from './scoreboard/CurrentScore'
import { HighScore } from './scoreboard/HighScore'

function Scoreboard(props) {
    return (
        <div className="Scoreboard flex flex-c justify-center align-center">
            <CurrentScore currentScore={props.currentScore} total={props.total} />
            <HighScore highScore={props.highScore} />
        </div>
    )
}

export { Scoreboard }