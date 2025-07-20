import * as React from 'react';
import { Box } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';


const EndBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2147483640',
    backgroundColor: 'rgba(19, 19, 26, 0.6)',
    padding: '50px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '10px',
}))


function GameOverScreen({ gameOver, setGameOver, score }) {
  const audioRef = useRef(null);
  const [playedOnce, setPlayedOnce] = useState(false);

  useEffect(() => {
    if (gameOver && !playedOnce) {
      if (!audioRef.current) {
        const audio = new Audio('/gameover2.m4a');
        audio.volume = 0.1;
        audioRef.current = audio;

        audio.onended = () => {
          setPlayedOnce(true);
          audioRef.current = null;
        };

        audio.play().catch((e) => {
          console.warn('Audio play failed:', e);
        });
      }
    }
  }, [gameOver, playedOnce]);

  const handleRestart = () => {
    setGameOver(false);
    setPlayedOnce(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  return (
    <EndBox style={{ display: gameOver ? '' : 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ textShadow: '0 2px 4px rgba(32, 18, 82, 1)' }}>Game Over</h1>
        <p style={{ textShadow: '0 2px 4px rgba(32, 18, 82, 1)', fontWeight: 'bold' }}>
          Final Score: {score}
        </p>
        <button onClick={handleRestart}>Play Again</button>
      </div>
    </EndBox>
  );
}

export default GameOverScreen