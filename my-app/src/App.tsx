import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Who's the Scammer?</h1>
      <div className="card">
        <p>
          "Who's the Scammer?" is a game where you will be presented with five different
          <br />fictional examples of common scams in real life. To each of these examples,
          <br />you will be asked to swipe LEFT if you think it's a scam, or RIGHT if it seems trustworthy.
          <br /><br />
          Use your best judgement and try to guess correctly for all five!
        </p> 
        <button onClick={() => setCount((count) => count + 1)}>
          Let's start!
        </button>
        <p>
        </p>
      </div>
    </>
  )
}

export default App
