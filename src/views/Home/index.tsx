import { createUseStyles } from 'react-jss';
// import GameList from './components/GameList';
import { useNavigate } from 'react-router-dom';
import { GameLocation } from 'Locations';
import MainLayout from 'layouts/MainLayout';
// import { useGames } from 'hooks/useGames';
// import { GameStatus } from 'web3/constants';

const useStyles = createUseStyles({
  contentContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    height: '64px',
    justifyContent: 'space-between',
    paddingInline: '32px',
  },
  innerContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: '200px',
  },
  start: {
    background: '#808687',
    color: '#fdfdfd',
    cursor: 'pointer',
    padding: '10px 15px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '600',
  },
});

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const styles = useStyles();
  // const { games } = useGames(1000, GameStatus.STARTED);
  return (
    <MainLayout>
      <div>
        <div className={styles.header}>
          <div />
          <div className={styles.start} onClick={() => navigate(GameLocation)}>
            Start game
          </div>
        </div>
        {/* <div className={styles.contentContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.title}>Battlezip</div>
            <GameList />
          </div>
        </div> */}
      </div>
    </MainLayout>
  );
}
