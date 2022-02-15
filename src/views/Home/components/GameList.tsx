import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    borderRadius: '12px',
    color: '#fdfdfd',
    width: '400px',
  },
  listHeader: {
    background: '#606060',
    borderBottom: '4px solid #848484',
    borderRadius: '12px',
    fontSize: '24px',
    fontWeight: 500,
    padding: '12px',
  },
});

export default function GameList(): JSX.Element {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>Active Games</div>
    </div>
  );
}
