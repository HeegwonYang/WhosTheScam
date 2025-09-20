import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import msgLogo from './assets/chat-bubble-user-svgrepo-com.svg'
import phishLogo from './assets/fishing-hook-3-svgrepo-com.svg'
import './App.css'

function Start(){
  return (
    <>
      <h1>Scam Spotter</h1>
      <div className="intro">
        <p>
          Scam Spotter is a mobile learning game designed to help adults practice identifying scams in a safe,
          interactive environment. With real-world inspired, AI-generated examples, users sharpen their ability
          to recognize fraudulent messages and build confidence in protecting themselves online.
          <br /><br />
          To start, choose a unit you want to play through from the options at the bottom. Then, for each message that
          appears, swipe LEFT if you think the message is a scam, or RIGHT if you think the message is trustworthy.
          If you're stuck, press the Hint button to show common red flags that might be present in the message.
          <br /><br />
          Each unit has 5 questions. Get all 5 correct, and you'll earn a badge for that unit!
        </p> 
        <Link to="/home"><button>Let's start!</button></Link>
        <p>
        </p>
      </div>
    </>
  )
}

function Home(){
  return(

    // if the flag for a pe
    <div>
      <Link to="/messages">
        <div>
        <h3>
            <img src={msgLogo} className="msg logo" alt="scam messages logo" />
        Scam Messages</h3>
        </div>
      </Link>
      <Link to="/phishing">
      <div>
        <h3>
          <img src={phishLogo} className="phish logo" alt="Phishing logo" />
        Phishing
        </h3>
      </div>
          
      </Link>
      <Link to="/social"><button>Social Media Scams</button></Link>
      <Link to="/misinfo"><button>Fake News & Misinformation </button></Link>
    </div>
  )
}

function Messages(){
  return <h1>placeholder for messages</h1>
}

function Phishing(){
  return <h1>placeholder for phishing</h1>
}

function Social(){
  return <h1>placeholder for social</h1>
}
function Misinfo(){
  return <h1>placeholder for misinfo</h1>
}


function App() {
  const [introCard, displayIntro] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/phishing" element={<Phishing />} />
        <Route path="/social" element={<Social />} />
        <Route path="/misinfo" element={<Misinfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
