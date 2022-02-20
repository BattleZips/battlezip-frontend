import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { RootLocation } from 'Locations';

const useStyles = createUseStyles({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%'
  },
  message: {
    color: '#0CABE8',
    fontSize: '48px',
    fontWeight: 700,
    letterSpacing: '3.6px'
  },
  return: {
    background: '#2861E9',
    borderRadius: '3px',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    marginTop: '16px',
    paddingInline: '12px'
  },
  status: {
    color: '#000000',
    fontSize: '110px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    marginTop: '8px'
  },
  top: {
    color: '#FA0000',
    fontSize: '48px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    marginTop: '48px'
  }
});

type GameOverProps = {
  winner: boolean;
};

export default function GameOver({ winner }: GameOverProps): JSX.Element {
  const navigate = useNavigate();
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.top}>{winner ? 'CONGRATULATIONS' : 'OH NO!'}</div>
      <div className={styles.status}>{winner ? 'VICTORY!' : 'DEFEATED'}</div>
      <div className={styles.message}>
        {winner ? 'YOU DEFEATED YOUR ENEMY' : 'YOU WERE DEFEATED BY YOUR ENEMY'}
      </div>
      <div className={styles.return} onClick={() => navigate(RootLocation)}>
        RETURN TO MENU
      </div>
    </div>
  );
}
