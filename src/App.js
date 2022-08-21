import './App.css'
import { Header } from './components/Header'
import { Scoreboard } from './components/Scoreboard'
import { Tarots } from './logic/Tarots'
import { useState, useEffect } from 'react'
import { Display } from './components/Display'

function App() {
  const [touchedCards, setTouchedCards] = useState([])
  const [currentCards, setCurrentCards] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const allCards = Tarots.cards.map((card) => {
    return card.id
  })

  useEffect(() => {
    setDisplay()
  }, [])

  useEffect(() => {
    setCurrentScore(touchedCards.length)
  }, [touchedCards])

  function touchCard(event) {
    if (touchedCards.includes(+event.target.dataset.id)) {
      wipeCards()
    } else {
      addCard(event)
    }
    setDisplay()
  }

  function addCard(event) {
    setTouchedCards(array => [...array, +event.target.dataset.id])
  }

  function wipeCards() {
    if (currentScore > highScore) {
      updateHighScore()
    }
    setTouchedCards([])
  }

  function updateHighScore() {
    setHighScore(touchedCards.length)
  }

  function setDisplay() {
    let cards = prepareDisplay()
    shuffleCards(cards)
    cards = convertCards(cards)
    setCurrentCards(cards)
  }

  function prepareDisplay() {
    let eligibleCards = allCards.filter((card) => !touchedCards.includes(card))
    let pityCard = eligibleCards[Math.floor(Math.random() * (eligibleCards.length - 1))]
    let displayCards = [pityCard]
    for (let i = 0; i < 9; i++) {
      let card = displayCards[0]
      while (displayCards.includes(card) === true || card === undefined) {
        card = allCards[Math.floor(Math.random() * (eligibleCards.length - 1))]

      }
      displayCards.push(card)
    }
    return displayCards
  }

  function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      let n = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[n]] = [cards[n], cards[i]];
    }
    if (cards.includes(undefined)) {
      console.log(cards)
    }
  }

  function convertCards(cards) {
    cards = cards.map((id) => {
      return Tarots.cards[id]
    })
    return cards
  }

  return (
    <div className="App">
      <div id="top" className="flex justify-between p-15">
        <Header />
        <Scoreboard currentScore={currentScore} total={allCards.length} highScore={highScore} />
      </div>
      <div className="flex justify-center align-center">
        <Display cards={currentCards} touchCard={touchCard} />
      </div>
    </div>
  );
}

export default App;
