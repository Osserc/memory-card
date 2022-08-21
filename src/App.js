import './App.css'
import { Header } from './components/Header'
import { Scoreboard } from './components/Scoreboard'
import { Tarots } from './components/Tarots'
import { useState, useEffect } from 'react'

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
      {Tarots.cards.map((card, index) => {
        return <img key={index} src={card.image} data-id={card.id} alt="tarot card" onClick={touchCard}></img>
      })}
    </div>
  );
}

export default App;
