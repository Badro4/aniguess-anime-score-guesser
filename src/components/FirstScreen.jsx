import * as React from 'react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';

const StartBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2147483640',
  backgroundColor: 'rgba(19, 19, 26, 0.9)',
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

function FirstScreen({show, setShow}) {

    return(
        <StartBox style={{display: show ? '' : 'none'}}>
            <h1>Welcome to AniGuess!</h1>
            <p>Test your skills in an interactive game where you'll be shown two anime and guess which one has a higher score.</p>
            <p>To get started, simply click the "Play Now" button below.</p>
            <br></br>
            <button onClick={() => setShow(false)}>Play Now</button>
        </StartBox>
    )
}

export default FirstScreen