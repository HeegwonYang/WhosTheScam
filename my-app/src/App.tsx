import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import msgLogo from './assets/chat-bubble-user-svgrepo-com.svg'
import phishLogo from './assets/fishing-hook-3-svgrepo-com.svg'
import socialLogo from './assets/social-media-cloud-svgrepo-com.svg'
import newsLogo from './assets/news-4301.svg'
import instructionsImg from './assets/instructions.png';
import './App.css'

function Start(){
  return (
    <>
      <div className="intro">
        <h1>Scam Spotter</h1>
        <p>
          Scam Spotter is a mobile learning game designed to help adults practice identifying scams in a safe,
          interactive environment. With real-world inspired, AI-generated examples, users sharpen their ability
          to recognize fraudulent messages and build confidence in protecting themselves online.
          <br /><br />
          <img 
          src={instructionsImg} 
          alt="Game instructions" 
          style={{ maxWidth: "500px", width: "100%", height: "auto", display: "block", margin: "2rem auto" }}
        />

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
  return (
    <div className="menu">
      <Link to="/messages">
        <div className="menu-item">
          <img src={msgLogo} className="logo" alt="scam messages logo" />
          <span>Scam Messages</span>
        </div>
      </Link>

      <Link to="/phishing">
        <div className="menu-item">
          <img src={phishLogo} className="logo" alt="phishing logo" />
          <span>Phishing</span>
        </div>
      </Link>

      <Link to="/social">
        <div className="menu-item">
          <img src={socialLogo} className="logo" alt="social media logo" />
          <span>Social Media Scams</span>
        </div>
      </Link>

      <Link to="/misinfo">
        <div className="menu-item">
          <img src={newsLogo} className="logo" alt="fake news logo" />
          <span>Fake News &amp; Misinformation</span>
        </div>
      </Link>

      <div className="menu-footer">
        <Link to="/"><button>Back</button></Link>
      </div>
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
