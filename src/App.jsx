import { useState } from 'react'
import './App.css'
import ImageButton from './components/ImageButton.jsx'
import AudioPlayer from './components/AudioPlayer.jsx'
import GameOverScreen from './components/GameOverScreen.jsx'
import FirstScreen from './components/FirstScreen.jsx'



function App() {
  const [show, setShow] = useState(true)

  return (
    <>
      <FirstScreen show={show} setShow={setShow}/>
      <ImageButton show={show} setShow={setShow}/>
      <AudioPlayer/>
    </>
  )
}

export default App
