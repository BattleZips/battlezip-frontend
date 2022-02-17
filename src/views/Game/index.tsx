import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Board from './components/Board';
import { EMPTY_SHIP, Ship } from './types';
import MainLayout from 'layouts/MainLayout';
import ShipSelection from './components/ShipSelection';
import carrier from './images/carrierSelection.svg';
import battleship from './images/battleshipSelection.svg';
import submarine from './images/submarineSelection.svg';
import cruiser from './images/cruiserSelection.svg';
import destroyer from './images/destroyerSelection.svg';

const useStyles = createUseStyles({
  content: {
    display: 'flex',
    gap: '114px',
    marginInline: 'auto',
    width: 'fit-content',
  },
  fleetLabel: {
    borderRadius: '3px',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '34.68px',
    paddingInline: '11px',
    textAlign: 'center',
  },
  rotateText: {
    fontSize: '24px',
    fontWeight: '',
    letterSpacing: '3.6px',
    marginTop: '55px',
    textAlign: 'center',
  },
  wrapper: {
    outline: 'none',
  },
});

const SHIPS: Ship[] = [
  {
    color: '#8204D6',
    image: carrier,
    name: 'carrier',
    length: 5,
    sections: [],
  },
  {
    color: '#1C04D3',
    image: battleship,
    name: 'battleship',
    length: 4,
    sections: [],
  },
  {
    color: '#09D1E8',
    image: cruiser,
    name: 'cruiser',
    length: 3,
    sections: [],
  },
  {
    color: '#26F207',
    image: submarine,
    name: 'submarine',
    length: 3,
    sections: [],
  },
  {
    color: '#EFE707',
    image: destroyer,
    name: 'destroyer',
    length: 2,
    sections: [],
  },
];

export default function Game(): JSX.Element {
  const styles = useStyles();
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);
  const [rotationAxis, setRotationAxis] = useState('y');
  const [selectedShip, setSelectedShip] = useState<Ship>(EMPTY_SHIP);

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

  const startGame = () => {
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
    <MainLayout>
      <div
        className={styles.wrapper}
        onKeyDown={(e) => handleRotate(e)}
        tabIndex={0}
      >
        <div className={styles.content}>
          <div style={{ width: '551px' }}>
            <div
              className={styles.fleetLabel}
              style={{ background: '#717C96' }}
            >
              DEPLOY YOUR FLEET
            </div>
            <ShipSelection
              placedShips={placedShips}
              removeShip={handleRemoveShip}
              selectShip={handleShipSelect}
              selectedShip={selectedShip}
              ships={SHIPS}
              startGame={startGame}
            />
          </div>
          <div style={{ width: '523px' }}>
            <div
              className={styles.fleetLabel}
              style={{ background: '#FF0055' }}
            >
              YOUR FLEET
            </div>
            <Board
              selectedShip={selectedShip}
              setPlacedShip={handlePlacedShip}
              placedShips={placedShips}
              rotationAxis={rotationAxis}
            />
            <div className={styles.rotateText}>
              [PRESS THE SPACE BAR TO ROTATE]
            </div>
          </div>
        </div>
        {/* <div className={styles.header}>
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
        </div> */}
      </div>
    </MainLayout>
  );
}
