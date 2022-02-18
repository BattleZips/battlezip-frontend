import { SetStateAction, useState } from 'react';
import { createUseStyles } from 'react-jss';
// import hitIcon from '../../images/hit.svg';
import missIcon from '../../images/miss.svg';
import { ReactComponent as CrosshairIcon } from './images/crosshair.svg';

const useStyles = createUseStyles({
  board: {
    marginTop: '25px',
  },
  crossHair: {
    stroke: '#FF0055',
    width: '100%',
  },
  fire: {
    borderRadius: '3px',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '3.6px',
    margin: '46px auto 0 auto',
    padding: '5px 15px',
    width: 'fit-content',
  },
  label: {
    alignItems: 'center',
    color: '#9CA3B6',
    display: 'flex',
    fontSize: '24px',
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: '34.68px',
    width: '46px',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: '7px',
    marginTop: '7px',
  },
  tile: {
    alignItems: 'center',
    background: '#EBEBEB',
    borderRadius: '3px',
    cursor: 'crosshair',
    display: 'flex',
    height: '46px',
    justifyContent: 'center',
    width: '46px',
  },
});

const BOARD = new Array(10).fill('').map((_) => new Array(10).fill(''));

type OpponentBoardProps = {
  shots: number[];
  takeShot: React.Dispatch<SetStateAction<number[]>>;
  yourTurn: boolean;
};

export default function OpponentBoard({
  shots,
  takeShot,
  yourTurn,
}: OpponentBoardProps): JSX.Element {
  const styles = useStyles();
  const [hoveredTile, setHoveredTile] = useState(-1);
  const [selectedTile, setSelectedTile] = useState(-1);

  const handleShot = () => {
    takeShot((prev) => [...prev, selectedTile].sort((a, b) => b - a));
    setSelectedTile(-1);
  };

  return (
    <div>
      <div className={styles.board}>
        <div className={styles.row} style={{ marginLeft: '46px' }}>
          {new Array(10).fill('').map((_, index) => (
            <div className={styles.label}>
              {String.fromCharCode(65 + index)}
            </div>
          ))}
        </div>
        {BOARD.map((row, rowIndex) => {
          return (
            <div className={styles.row}>
              <div className={styles.label}>{rowIndex + 1}</div>
              {row.map((_, colIndex) => {
                const index = rowIndex * 10 + colIndex;
                // TODO: Include hit or miss logic
                const wasShot = shots.includes(index);
                return (
                  <div
                    className={styles.tile}
                    onClick={() => !wasShot && setSelectedTile(index)}
                    onMouseOver={() => setHoveredTile(index)}
                    onMouseLeave={() => setHoveredTile(-1)}
                  >
                    {wasShot && <img alt='Shot' src={missIcon} />}
                    {index === selectedTile && (
                      <CrosshairIcon className={styles.crossHair} />
                    )}
                    {!wasShot &&
                      index === hoveredTile &&
                      index !== selectedTile && (
                        <CrosshairIcon
                          className={styles.crossHair}
                          style={{ opacity: 0.6 }}
                        />
                      )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div
        className={styles.fire}
        onClick={() => selectedTile >= 0 && handleShot()}
        style={{
          background: selectedTile >= 0 ? '#FF0055' : '#C7C7C7',
          cursor: selectedTile >= 0 ? 'pointer' : 'not-allowed',
        }}
      >
        {selectedTile >= 0 ? 'FIRE' : 'SELECT POSITION'}
      </div>
    </div>
  );
}
