import './App.css';
import { Tarots } from './components/Tarots'
import { useState, useEffect } from 'react'

function App() {
  const [touchedCards, setTouchedCards] = useState([])
  let allCards = Tarots.cards.map((card) => {
    return card.id
  })


  function touchCard(event) {
    setTouchedCards(array => [...array, +event.target.dataset.id])
  }

  return (
    <div className="App">
      {console.log(touchedCards)}
      {console.log(allCards)}
      {Tarots.cards.map((card, index) => {
        return <img key={index} src={card.image} data-id={card.id} alt="tarot card" onClick={touchCard}></img>
      })}
    </div>
  );
}

export default App;
