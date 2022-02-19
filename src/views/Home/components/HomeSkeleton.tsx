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
  content: {
    display: 'flex',
    marginTop: '55px',
    gap: '200px',
    marginInline: 'auto',
    width: 'fit-content'
  },
  header: {
    animation: '$shine 2s ease-in-out infinite',
    borderRadius: '3px',
    height: '38.67px'
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    width: '551px'
  },
  option: {
    animation: '$shine 2s ease-in-out infinite',
    borderRadius: '3px',
    height: '36px',
    marginTop: '36px',
    width: '387px'
  },
  options: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '186px'
  },
  right: {
    width: '523px'
  },
  selector: {
    animation: '$shine 2s ease-in-out infinite',
    borderRadius: '3px',
    marginTop: '65px',
    height: '523px',
    width: '100%'
  }
});

export default function HomeSkeleton() {
  const styles = useStyles();
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <div className={styles.header} />
        <div className={styles.options}>
          <div className={styles.option} />
          <div className={styles.option} />
          <div className={styles.option} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header} />
        <div className={styles.selector} />
      </div>
    </div>
  );
}
