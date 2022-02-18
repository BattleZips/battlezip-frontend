import { useMemo, useState } from 'react';
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
import OpponentBoard from './components/Board/OpponentBoard';

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
    paddingBlock: '2px',
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
  // const [opponentShots, setOpponentShots] = useState<number[]>([]);
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);
  const [rotationAxis, setRotationAxis] = useState('y');
  const [selectedShip, setSelectedShip] = useState<Ship>(EMPTY_SHIP);
  const [started, setStarted] = useState(false);
  const [yourShots, setYourShots] = useState<number[]>([]);
  // const yourTurn = false;

  const allPlaced = useMemo(() => {
    return placedShips.length === 5;
  }, [placedShips]);

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
    setStarted(true);
  };

  return (
    <MainLayout>
      <div
        className={styles.wrapper}
        onKeyDown={(e) => handleRotate(e)}
        tabIndex={0}
      >
        <div className={styles.content}>
          <div style={{ width: started ? '523px' : '551px' }}>
            <div
              className={styles.fleetLabel}
              style={{ background: '#717C96' }}
            >
              {started ? 'OPPONENT' : 'DEPLOY YOUR FLEET'}
            </div>
            {started ? (
              <OpponentBoard
                shots={yourShots}
                takeShot={setYourShots}
                yourTurn={true}
              />
            ) : (
              <ShipSelection
                allPlaced={allPlaced}
                placedShips={placedShips}
                removeShip={handleRemoveShip}
                selectShip={handleShipSelect}
                selectedShip={selectedShip}
                ships={SHIPS}
                startGame={startGame}
              />
            )}
          </div>
          <div style={{ width: '523px' }}>
            <div
              className={styles.fleetLabel}
              style={{ background: '#FF0055' }}
            >
              YOUR FLEET
            </div>
            <Board
              allPlaced={allPlaced}
              selectedShip={selectedShip}
              setPlacedShip={handlePlacedShip}
              placedShips={placedShips}
              rotationAxis={rotationAxis}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
