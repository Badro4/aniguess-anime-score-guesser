import * as React from 'react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
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


function GameOverScreen({gameOver, setGameOver, score, setScore}) {
    return (
        <EndBox style={{display: gameOver ? '' : 'none'}}>
            <div style={{display: 'flex', justifyContent: 'right', top: '50%', left: '18%', transform: 'translate(-50%, -50%)', position: 'absolute', zIndex: '-1'}}>
                <img src="src\assets\umaruL.png" alt="game over" style={{height: '270px'}}></img>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems: 'center'}}>
                <h1>Game Over</h1>
                <p>Final Score: {score}</p>
                <button onClick={() => setGameOver(false)}>Play Again</button>
            </div>
        </EndBox>
    );
}

export default GameOverScreen