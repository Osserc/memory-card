import './App.css'
import { Header } from './components/Header'
import { Scoreboard } from './components/Scoreboard'
import { Tarots } from './logic/Tarots'
import { useState, useEffect } from 'react'
import { Display } from './components/Display'

function App() {
  const [touchedCards, setTouchedCards] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  let allCards = Tarots.cards.map((card) => {
    return card.id
  })


  function touchCard(event) {
    setTouchedCards(array => [...array, +event.target.dataset.id])
  }

  return (
    <div className="App">
      <div className="flex justify-between p-15">
        <Header />
        <Scoreboard currentScore={currentScore} total={allCards.length} highScore={highScore} />
      </div>
      {console.log(touchedCards)}
      {console.log(allCards)}
      <Display cards={Tarots.cards} touchCard={touchCard} />
    </div>
  );
}

export default App;
