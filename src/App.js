import './App.css'
import { Header } from './components/Header'
import { Scoreboard } from './components/Scoreboard'
import { Tarots } from './logic/Tarots'
import { useState, useEffect } from 'react'
import { Display } from './components/Display'
import { Ruleset } from './components/Ruleset'
import { Endgame } from './components/Endgame'

function App() {
  const [touchedCards, setTouchedCards] = useState([])
  const [currentCards, setCurrentCards] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [endGame, setEndGame] = useState(false)
  const allCards = Tarots.cards.map((card) => {
    return card.id
  })

  useEffect(() => {
    setDisplay()
    const modal = document.getElementById('ruleset')
    document.body.addEventListener('click', () => {
      modal.classList.remove('visible')
    }, { once: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCurrentScore(touchedCards.length)
    if (touchedCards.length !== 22) {
      advanceRound()
    } else {
      closeGame()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchedCards])

  function touchCard(event) {
    if (touchedCards.includes(+event.target.dataset.id)) {
      wipeCards()
    } else {
      addCard(event)
    }
  }

  function advanceRound() {
    setDisplay()
  }

  function closeGame() {
    updateHighScore()
    setEndGame(true)
  }

  function resetGame() {
    setEndGame(false)
    setTouchedCards([])
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
        card = allCards[Math.floor(Math.random() * (allCards.length - 1))]

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
        { endGame === false ?
          <Display cards={currentCards} touchCard={touchCard} />
          :
          <Endgame resetGame={resetGame} />
        }
      </div>
      <Ruleset />
    </div>
  );
}

export default App;
