import { createUseStyles } from 'react-jss';
import GameList from './components/GameList';
import { useNavigate } from 'react-router-dom';
import { GameLocation } from 'Locations';

const useStyles = createUseStyles({
  contentContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
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
  return (
    <div>
      <div className={styles.header}>
        <div />
        <div className={styles.start} onClick={() => navigate(GameLocation)}>
          Start game
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>Battlezip</div>
          <GameList />
        </div>
      </div>
    </div>
  );
}
