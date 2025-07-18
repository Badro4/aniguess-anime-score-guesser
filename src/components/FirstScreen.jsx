import * as React from 'react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';


const StartBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2147483640',
  backgroundColor: 'rgba(23, 23, 32, 0.9)',
  padding: theme.spacing(4),
  width: '85%', 
  maxWidth: '500px', // Limits width on larger screens
  minHeight: '50%', 
  maxHeight: '80vh', // Prevents being too tall
  borderRadius: '10px',
  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
  transition: 'filter 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflowY: 'auto', // Adds scroll if content is too long
  [theme.breakpoints.up('md')]: {
    width: '35%',
    height: '75%',
    padding: '50px'
  },
  '& h1': {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Responsive font size
    marginBottom: theme.spacing(2)
  },
  '& p': {
    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', // Responsive paragraph text
    lineHeight: 1.5,
    marginBottom: theme.spacing(2),
    wordBreak: 'break-word' // Ensures text wraps
  },
  '& button': {
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    marginTop: theme.spacing(2),
    alignSelf: 'center'
  }
}))

function FirstScreen({show, setShow, scoreRating, setScoreRating, setFavRating }) {
    return(
        <StartBox style={{display: show ? '' : 'none'}}>
            <h1>AniGuess!</h1>
            <p><strong>Two anime. One winner. Can you guess which show is rated higher?.</strong></p>
            
            <ToggleButtonGroup
            color="primary"
            value={scoreRating ? 'score' : 'favs'}
            exclusive
            onChange={(e, newMode) => {
              if (newMode === 'score') {
                setScoreRating(true);
                setFavRating(false);
              } else if (newMode === 'favs') {
                setScoreRating(false);
                setFavRating(true);
              }
            }}
            sx={{
              alignSelf: 'center',
              marginTop: 2,
              backgroundColor: '#2c2c36',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <ToggleButton 
              value="score"
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#00a36c',
                  color: 'white'
                }
              }}
            >
              ⭐ Score
            </ToggleButton>
            <ToggleButton 
              value="favs"
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#d67f7fff',
                  color: 'white'
                }
              }}
            >
              ❤️ Favs
            </ToggleButton>
          </ToggleButtonGroup>
            <img 
            src="/Plana_Portrait.png" 
            alt="Plana" 
            style={{
            position: 'absolute',
            bottom: '0',
            left: '10%',
            height: '100%',
            zIndex: -2,               
            opacity: 0.7,            
            pointerEvents: 'none',   // Prevent interaction
            userSelect: 'none',
            objectFit: 'cover'
            }}
            />
            <button onClick={() => setShow(false)}>Play Now</button>
        </StartBox>
    )
}

export default FirstScreen