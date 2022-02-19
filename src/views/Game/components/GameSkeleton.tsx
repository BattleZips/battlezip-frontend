import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@keyframes shine': {
    '0%': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    '50%': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    '100%': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)'
    }
  },
  board: {
    animation: '$shine 2s ease-in-out infinite',
    borderRadius: '3px',
    height: '523px',
    marginTop: '25px',
    width: '100%'
  },
  content: {
    display: 'flex',
    gap: '114px',
    marginInline: 'auto',
    width: 'fit-content',
    ' & > div': {
      width: '523px'
    }
  },
  fleetLabel: {
    animation: '$shine 2s ease-in-out infinite',
    background: 'black',
    borderRadius: '3px',
    height: '38.67px',
    textAlign: 'center',
    width: '100%'
  }
});

export default function GameSkeleton(): JSX.Element {
  const styles = useStyles();
  return (
    <div className={styles.content}>
      <div>
        <div className={styles.fleetLabel} />
        <div className={styles.board} />
      </div>
      <div>
        <div className={styles.fleetLabel} />
        <div className={styles.board} />
      </div>
    </div>
  );
}
