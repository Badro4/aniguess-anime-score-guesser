import { useState } from 'react'
import './App.css'
import ImageButton from './components/ImageButton.jsx'
import AudioPlayer from './components/AudioPlayer.jsx'
import GameOverScreen from './components/GameOverScreen.jsx'
import FirstScreen from './components/FirstScreen.jsx'



function App() {
  const [show, setShow] = useState(true)
  const [scoreRating, setScoreRating] = useState(true);
  const [favRating, setFavRating] = useState(false);

  return (
    <>
      <video
      autoPlay
      loop
      muted
      playsInline
      className="video-background"
      > 
      <source src="/background2.mp4" type="video/mp4" />
      </video>
      <FirstScreen show={show} setShow={setShow} scoreRating={scoreRating} setScoreRating={setScoreRating} setFavRating={setFavRating}/>
      <ImageButton show={show} setShow={setShow} scoreRating={scoreRating} favRating={favRating}/>
      <AudioPlayer/>
      
    </>
  )
}

export default App
