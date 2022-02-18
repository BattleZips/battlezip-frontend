import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { GameLocation } from 'Locations';
import MainLayout from 'layouts/MainLayout';
import { useMemo } from 'react';
import { Game } from './types';
import GameList from './components/GameList';
import { useGames } from 'hooks/useGames';
import { GameStatus } from 'web3/constants';
// import { getRandomInt } from 'utils';

const useStyles = createUseStyles({
  content: {
    display: 'flex',
    marginTop: '55px',
    gap: '200px',
    marginInline: 'auto',
    width: 'fit-content',
  },
  gameOption: {
    alignItems: 'center',
    display: 'flex',
    gap: '49px',
    marginInline: 'auto',
    textAlign: 'left',
    width: '387px',
  },
  gameOptions: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '24px',
    fontWeight: 400,
    gap: '36px',
    letterSpacing: '3.6px',
    lineHeight: '34.68px',
    marginTop: '221px',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    width: '551px',
  },
  right: {
    width: '523px',
  },
  sectionHead: {
    borderRadius: '3px',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    lineHeight: '34.68px',
    paddingBlock: '2px',
    textAlign: 'center',
  },
  select: {
    alignItems: 'center',
    border: '4px solid #717C96',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    height: '28px',
    justifyContent: 'center',
    width: '28px',
  },
  selected: {
    background: '#000000',
    borderRadius: '50%',
    height: '20px',
    width: '20px',
  },
  startButton: {
    borderRadius: '3px',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    lineHeight: '34.68px',
    margin: '239px auto 0 auto',
    paddingBlock: '2px',
    textAlign: 'center',
    width: '245px',
  },
});

const GAME_OPTIONS = ['HOST GAME', 'JOIN GAME', 'JOIN RANDOM GAME'];

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const styles = useStyles();
  const [gameOption, setGameOption] = useState(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { games } = useGames(1000, GameStatus.STARTED);

  const disabled = useMemo(() => {
    return false;
  }, []);

  const handleOptionSelected = (option: number) => {
    if (option === gameOption) return;
    else {
      setGameOption(option);
      setSelectedGame(null);
    }
  };

  const startGame = () => {
    switch (gameOption) {
      case 0: {
        // TODO: Add smart contract function to start game
        break;
      }
      case 1: {
        if (!games) break;
        // TODO: Add smart contract function to join game
        break;
      }
      case 2: {
        if (!games) break;
        // const gameId = getRandomInt(0, games.length - 1);
        // TODO: Add smart contract function to join game
        break;
      }
    }
    navigate(GameLocation);
  };

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.sectionHead} style={{ background: '#FF0055' }}>
            PLAY GAME
          </div>
          <div className={styles.gameOptions}>
            {GAME_OPTIONS.map((option, index) => (
              <div className={styles.gameOption}>
                <div
                  className={styles.select}
                  onClick={() => handleOptionSelected(index)}
                >
                  {index === gameOption && <div className={styles.selected} />}
                </div>
                <div>{option}</div>
              </div>
            ))}
          </div>
          <div
            className={styles.startButton}
            onClick={() => startGame()}
            style={{
              background: disabled ? '#C7C7C7' : '#2861E9',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            START GAME
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.sectionHead} style={{ background: '#717C96' }}>
            OPEN GAMES
          </div>

          <GameList
            games={games ?? []}
            gameOption={gameOption}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
          />
        </div>
      </div>
    </MainLayout>
  );
}
