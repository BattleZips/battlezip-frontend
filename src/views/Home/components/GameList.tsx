import Avatar from 'components/Avatar';
import { SetStateAction } from 'react';
import { createUseStyles } from 'react-jss';
import { Game } from '../types';

const useStyles = createUseStyles({
  gameSelector: {
    border: '2px solid #717C96',
    height: '523px',
    marginTop: '65px',
    overflowY: 'auto',
    width: '100%'
  },
  noOpenGames: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '28px',
    fontWeight: 700,
    height: '523px',
    justifyContent: 'center',
    letterSpacing: '3.6px'
  },
  row: (props: any) => ({
    alignItems: 'center',
    color: '#9CA3B6',
    cursor: 'pointer',
    display: 'flex',
    fontWeight: 700,
    gap: '14px',
    padding: '7px 23px',
    transition: '.3s background',
    '&:hover': {
      background: props.gameOption === 1 ? '#DFF4FF' : ''
    }
  }),
  selectText: {
    fontSize: '24px',
    fontWeight: 400,
    letterSpacing: '3.6px',
    lineHeight: '34.68px',
    marginTop: '55px',
    textAlign: 'center'
  }
});

type GameListProps = {
  games: Game[];
  gameOption: number;
  selectedGame: Game | null;
  setSelectedGame: React.Dispatch<SetStateAction<Game | null>>;
};

export default function GameList({
  games,
  gameOption,
  selectedGame,
  setSelectedGame
}: GameListProps): JSX.Element {
  const styles = useStyles({ gameOption, selectedGame });
  return (
    <div>
      {games.length ? (
        <>
          <div className={styles.gameSelector}>
            {games.map((game) => (
              <div
                className={styles.row}
                key={game.address}
                onClick={() => gameOption === 1 && setSelectedGame(game)}
                style={{
                  background:
                    selectedGame?.address === game.address ? '#DFF4FF' : ''
                }}
              >
                <Avatar address={game.address} />
                <div>{game.ens || game.address}</div>
              </div>
            ))}
          </div>
          {gameOption === 1 && (
            <div className={styles.selectText}>[SELECT GAME TO JOIN]</div>
          )}
        </>
      ) : (
        <div className={styles.noOpenGames}>NO OPEN GAMES</div>
      )}
    </div>
  );
}
