import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import GameOverScreen from './GameOverScreen';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex', 
  minHeight: '600px', 
  width: '100%',
  maxWidth: '100vw', // Prevent over-stretching
  justifyContent: "center",
  alignItems: "center", // Vertical center
  gap: '25px',
  px: 2,
  [theme.breakpoints.down('sm')]: {
    width: '80%',
    margin: '0 auto',
    justifyContent: "center",
    alignItems: "center",
    flexWrap: 'wrap',
    gap: 20,
    px: 2,},
}));
    
const ButtonImage = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        border: '1px solid rgba(69, 64, 82, 0.6)',
        height: 500,
        flex: '1 1 50%', // Take up half the space
        maxWidth: 'calc(50% - 10px)', // Account for gap
        minWidth: '300px',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))', // Drop shadow effect
        transition: 'filter 0.3s ease',
        '&:focus': { outline: 'none' }, 
        [theme.breakpoints.down('sm')]: {
          width: '100% !important',
          maxWidth: '100% !important',
          height: 400, // Consider smaller height on mobile
          flex: '1 1 100%',
        },
        '&:hover, &.Mui-focusVisible': {
          zIndex: 1,
          '& .MuiImageBackdrop-root': {
            opacity: 0.15,
          },
          '& .MuiImageMarked-root': {
            opacity: 0,
          },
          '& .MuiTypography-root': {
            border: '4px solid currentColor',
          },
          border: '0px solid rgba(0, 0, 0, 0.6)',
        },
      }));

const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      });
      
const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      }));
      
const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      }));
      
const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      }));

export default function ImageButton({show, setShow}) {
    const [animes, setAnimes] = useState([]);
    const [currentPair, setCurrentPair] = useState([]);
    const [loadingState, setLoadingState] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('');
    let [gameResults, setGameResults] = useState('false');
    const [gameOver, setGameOver] = useState(false);
    const [prevScore, setPrevScore] = useState(0);
    const isDev = import.meta.env.MODE === 'development';
    const apiUrl = isDev ? '/api' : 'https://graphql.anilist.co'

    const fetchAnimes = async () => {
      setLoadingState(true);
      try {
        const query = `
          query ($page: Int) {
            Page(page: $page, perPage: 50) {
              media(sort: POPULARITY_DESC, type: ANIME) {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  extraLarge
                }
                favourites
                averageScore
              }
            }
          }
        `;
        
        // Array of pages to fetch
        const pagesToFetch = [1, 2, 5, 10, 12, 15, 7, 20];
        
        // Fetch all pages in parallel
        const responses = await Promise.all(
          pagesToFetch.map(page => 
            fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({ 
                query,
                variables: { page }
              }),
            })
          )
        );
        
        // Process all responses
        const allData = await Promise.all(
          responses.map(response => response.json())
        );
        
        // Combine all anime from all pages
        const combinedAnimes = allData.flatMap(data => data.data.Page.media);
        setAnimes(combinedAnimes);
        pickNewPair(combinedAnimes);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setLoadingState(false);
      }
    }

    useEffect(() => { fetchAnimes()}, [])

    const pickNewPair = (pool = animes) => {
      setGameResults(false);
      const firstIndex = Math.floor(Math.random() * pool.length)
      let secondIndex = Math.floor(Math.random() * pool.length)

      if(firstIndex === secondIndex){
        secondIndex = Math.floor(Math.random() * pool.length)
      }
      setCurrentPair([pool[firstIndex], pool[secondIndex]]); // [first, second]);
    }

    const handleGuess = (clickedAnime) => {
      if (gameOver === true || show === true) return;
      if (gameResults === true) return;
        // Find which anime has a higher score
        const mostFavorited = currentPair[0].averageScore > currentPair[1].averageScore
            ? currentPair[0] 
            : currentPair[1];

        if (clickedAnime.id === mostFavorited.id) {
            // Correct guess
            setScore(prev => prev + 1);
            setGameStatus('win');
        } else {
            // Wrong guess
            setPrevScore(score);
            setScore(0);
            setGameStatus('lose');
            setGameOver(true);
        }
        setGameResults(true);

        setTimeout(() => {
          pickNewPair(animes);
        }, 700);
    };
    if(loadingState) {
      return (
        <div className="loading" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <CircularProgress />
        </div>
      )
    } else return (
        <div style={{ paddingBottom: '2rem' }}>
          <div>
            <p style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '25px', marginTop: '25px'}}>Score: {score}</p>
          </div>
        <StyledBox>
              {currentPair.map((anime) => (
              <Fade in={true} key={anime.id} timeout={500}>
              <ButtonImage
                focusRipple 
                key={anime.id}  
                onClick={() => handleGuess(anime)}  
                style={{ cursor: gameOver === true || show === true ? '' : 'pointer', pointerEvents: gameOver === true || show === true ? 'none' : 'auto'}}  
              >
                <ImageSrc style={{ backgroundImage: `url(${anime.coverImage.extraLarge})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" style={{ backgroundColor: gameResults === true ? (gameStatus === 'win' ? 'rgba(0, 163, 108, 0.5)' : 'rgba(255, 0, 0, 0.5)') : ""}} />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={(theme) => ({
                      position: 'relative',
                      fontWeight: 'bold',
                      p: 4,
                      pt: 2,
                      pb: `calc(${theme.spacing(1)} + 6px)`,
                    })}
                  >
                    {anime.title.english || anime.title.romaji}
                    { gameResults === true && (<span style={{
                            display: 'block',
                            fontSize: '1.2rem',
                            marginTop: '10px',
                            fontWeight: 'bold',
                            borderRadius: '12px',
                            backgroundColor: gameStatus === 'win' ? 'rgba(0, 163, 108, 0.5)' : 'rgba(255, 0, 0, 0.5)',
                            padding: '5px 10px',
                            width: '100%',
                            textAlign: 'center',
                          }}>
                             {anime.averageScore /10} ⭐
                          </span>
                    )}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ButtonImage>
              </Fade>
            ))}
          </StyledBox>
          <GameOverScreen gameOver={gameOver} setGameOver={setGameOver} score={prevScore}/>
          </div>
        );
      }