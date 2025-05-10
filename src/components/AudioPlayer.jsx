import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import MusicNote from '@mui/icons-material/MusicNote';
import MusicOff from '@mui/icons-material/MusicOff';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import openingThemes from './openings';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: '10px',
  right: '10px',
  zIndex: '2147483640',
  transition: 'transform 0.3s ease, filter 0.3s ease',
  '&:focus, &:focus-visible': {
    outline: 'none',
  },
  '&:hover': {
    transform: 'scale(1.3)',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  },
}));

const AnimeTitle = styled(Typography)(({ theme }) => ({
  position: 'fixed',
  top: '18px',
  right: '60px',
  zIndex: '2147483640',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: '500',
  transition: 'opacity 0.3s ease',
}));

function AudioPlayer() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function handleAudioEnd() {
    setCurrentSong((prev) => (prev + Math.round(Math.random()*100)) % openingThemes.length);
  }

  function togglePlayback() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = openingThemes[currentSong].url;
      audioRef.current.volume = 0.05;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentSong]);

  return (
    <div>
      <AnimeTitle variant="body2">
      <StyledIconButton 
        aria-label="skip"
        onClick={handleAudioEnd}
        style={{
            top: '50px'
        }}
      >
        <SkipNextIcon style={{ color: "#42a5f5", fontSize: 30 }} />
      </StyledIconButton>
        {openingThemes[currentSong].name}
      </AnimeTitle>
      <StyledIconButton 
        aria-label={isPlaying ? 'Pause' : 'Play'} 
        onClick={togglePlayback}
      >
        {isPlaying ? (
          <MusicNote style={{ color: "#42a5f5", fontSize: 30 }} />
        ) : (
          <MusicOff style={{ color: '#e57373', fontSize: 30 }} />
        )}
      </StyledIconButton>
      <audio ref={audioRef} onEnded={handleAudioEnd} loop={false} preload="auto"/>
    </div>
  );
}

export default AudioPlayer;