import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Board from './components/Board';
import { EMPTY_SHIP, Ship } from './types';
import remove from 'images/x.svg';

const useStyles = createUseStyles({
  actionContainer: {
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
  remove: {
    cursor: 'pointer',
    height: '16px',
    width: '16px',
  },
  selectedShipContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: '48px',
  },
  ship: {
    alignItems: 'center',
    display: 'flex',
    gap: '12px',
    marginTop: '30px',
    width: '150px',
  },
  shipIcon: {
    borderRadius: '50%',
    height: '30px',
    width: '30px',
  },
  shipSelection: {
    marginRight: '200px',
  },
  start: {
    background: '#808687',
    color: '#fdfdfd',
    cursor: 'pointer',
    padding: '10px 15px',
  },
});

const SHIPS: Ship[] = [
  { color: '#8204D6', name: 'Carrier', length: 5, sections: [] },
  { color: '#1C04D3', name: 'Battleship', length: 4, sections: [] },
  { color: '#09D1E8', name: 'Cruiser', length: 3, sections: [] },
  { color: '#26F207', name: 'Submarine', length: 3, sections: [] },
  { color: '#EFE707', name: 'Destroyer', length: 2, sections: [] },
];

export default function Game(): JSX.Element {
  const styles = useStyles();
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);
  const [rotationAxis, setRotationAxis] = useState('y');
  const [selectedShip, setSelectedShip] = useState<Ship>(EMPTY_SHIP);

  const isPlaced = (ship: Ship) => {
    return placedShips.find((placedShip) => placedShip.name === ship.name);
  };

  const handleShipSelect = (ship: Ship) => {
    setSelectedShip(ship.name === selectedShip.name ? EMPTY_SHIP : ship);
  };

  const handlePlacedShip = (placedShip: Ship) => {
    setPlacedShips((prev) =>
      [...prev, placedShip].sort((a, b) => b.length - a.length)
    );
    setSelectedShip(EMPTY_SHIP);
  };

  const handleRemoveShip = (removedShip: Ship) => {
    setPlacedShips((prev) =>
      prev.filter((ship) => ship.name !== removedShip.name)
    );
  };

  const handleRotate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Space') {
      setRotationAxis((prev) => (prev === 'x' ? 'y' : 'x'));
    }
  };

  const logBoard = () => {
    const board: number[][] = [];
    placedShips.forEach((ship: Ship) => {
      const x = Math.floor(ship.sections[0] / 10);
      const y = ship.sections[0] % 10;
      const z = ship.orientation === 'x' ? 0 : 1;
      board.push([x, y, z]);
    });
    console.table(board);
  };

  return (
    <div
      onKeyDown={(e) => handleRotate(e)}
      style={{ outline: 'none' }}
      tabIndex={0}
    >
      <div className={styles.header}>
        <div className={styles.selectedShipContainer}>
          {selectedShip.name && (
            <>
              <div>Press space to rotate</div>
              <div>Ship: {selectedShip.name}</div>{' '}
            </>
          )}
        </div>
        <div>
          {placedShips.length === 5 && (
            <div className={styles.start} onClick={() => logBoard()}>
              Start game
            </div>
          )}
        </div>
      </div>
      <div className={styles.actionContainer}>
        <div className={styles.shipSelection}>
          {SHIPS.map((ship) => {
            const selected = selectedShip.name === ship.name;
            const placed = isPlaced(ship);
            return (
              <div
                className={styles.ship}
                onClick={() => !selected && !placed && handleShipSelect(ship)}
                style={{ cursor: placed ? 'initial' : 'pointer' }}
              >
                <div
                  className={styles.shipIcon}
                  style={{
                    background: selected || placed ? '#C9C9C9' : ship.color,
                  }}
                />
                <div>{ship.name}</div>
                {placed && (
                  <img
                    alt='Remove'
                    className={styles.remove}
                    onClick={() => handleRemoveShip(ship)}
                    src={remove}
                  />
                )}
              </div>
            );
          })}
        </div>
        <Board
          placedShips={placedShips}
          rotationAxis={rotationAxis}
          selectedShip={selectedShip}
          setPlacedShip={handlePlacedShip}
        />
      </div>
    </div>
  );
}
