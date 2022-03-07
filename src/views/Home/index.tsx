import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import {
  ActiveGameLocation,
  JoinGameLocation,
  NewGameLocation
} from 'Locations';
import MainLayout from 'layouts/MainLayout';
import { useMemo } from 'react';
import { Game } from './types';
import GameList from './components/GameList';
import { useGames } from 'hooks/useGames';
import { GameStatus } from 'web3/constants';
import HomeSkeleton from './components/HomeSkeleton';
import { useWallet } from 'contexts/WalletContext';
import { playingGame } from 'web3/battleshipGame';
import { getRandomInt } from 'utils';

const useStyles = createUseStyles({
  content: {
    display: 'flex',
    gap: '200px',
    marginInline: 'auto',
    width: 'fit-content'
  },
  gameOption: {
    alignItems: 'center',
    display: 'flex',
    gap: '49px',
    marginInline: 'auto',
    textAlign: 'left',
    width: '387px'
  },
  gameOptions: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '24px',
    fontWeight: 400,
    gap: '36px',
    letterSpacing: '3.6px',
    lineHeight: '34.68px',
    marginTop: '221px'
  },
  isInGame: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '48px',
    fontWeight: 700,
    height: '400px',
    justifyContent: 'center',
    letterSpacing: '3.6px'
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    width: '551px'
  },
  rejoin: {
    background: '#FF0055',
    borderRadius: '3px',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    lineHeight: '34.68px',
    margin: '48px auto 0 auto',
    padding: '6px 12px',
    textAlign: 'center'
  },
  right: {
    width: '523px'
  },
  sectionHead: {
    borderRadius: '3px',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    lineHeight: '34.68px',
    paddingBlock: '2px',
    textAlign: 'center'
  },
  select: {
    alignItems: 'center',
    border: '4px solid #717C96',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    height: '28px',
    justifyContent: 'center',
    width: '28px'
  },
  selected: {
    background: '#000000',
    borderRadius: '50%',
    height: '20px',
    width: '20px'
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
    width: '245px'
  }
});

const GAME_OPTIONS = ['HOST GAME', 'JOIN GAME', 'JOIN RANDOM GAME'];

export default function Home(): JSX.Element {
  const { address, chainId, provider } = useWallet();
  const navigate = useNavigate();
  const styles = useStyles();
  const [activeGame, setActiveGame] = useState(0);
  const [gameOption, setGameOption] = useState(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { fetching, games, refreshCount } = useGames(
    1000,
    GameStatus.Started,
    activeGame < 0
  );

  const disabled = useMemo(() => {
    return (
      (gameOption === 1 && !selectedGame) ||
      (gameOption === 2 && !games?.length)
    );
  }, [games, gameOption, selectedGame]);

  const playing = async () => {
    if (!address || !chainId || !provider) return;
    const playing = await playingGame(chainId, provider, address);
    setActiveGame(playing || -1);
  };

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
        navigate(NewGameLocation);
        break;
      }
      case 1: {
        if (!games || !selectedGame) break;
        navigate(JoinGameLocation(`${selectedGame.id}`));
        break;
      }
      case 2: {
        if (!games) break;
        const randomIndex = getRandomInt(0, games.length - 1);
        navigate(JoinGameLocation(`${games[randomIndex].id}`));
        break;
      }
    }
  };

  useEffect(() => {
    playing();
    // eslint-disable-next-line
  }, [address, provider]);

  return (
    <MainLayout>
      {fetching && !refreshCount ? (
        <HomeSkeleton />
      ) : activeGame > 0 ? (
        <div className={styles.isInGame}>
          <div>YOU ARE ALREADY IN A GAME</div>
          <div
            className={styles.rejoin}
            onClick={() => navigate(ActiveGameLocation(`${activeGame}`))}
          >
            REJOIN
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.left}>
            <div
              className={styles.sectionHead}
              style={{ background: '#FF0055' }}
            >
              PLAY GAME
            </div>
            <div className={styles.gameOptions}>
              {GAME_OPTIONS.map((option, index) => (
                <div className={styles.gameOption} key={option}>
                  <div
                    className={styles.select}
                    onClick={() => handleOptionSelected(index)}
                  >
                    {index === gameOption && (
                      <div className={styles.selected} />
                    )}
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
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
            >
              START GAME
            </div>
          </div>
          <div className={styles.right}>
            <div
              className={styles.sectionHead}
              style={{ background: '#717C96' }}
            >
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
      )}
    </MainLayout>
  );
}
