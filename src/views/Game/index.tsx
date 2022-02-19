import { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Board from '../../components/Board';
import { EMPTY_SHIP, Ship } from 'components/Board/types';
import MainLayout from 'layouts/MainLayout';
import OpponentBoard from 'components/Board/OpponentBoard';
import { createGame } from 'web3/battleshipGame';
import { useNavigate, useParams } from 'react-router-dom';
import { useWallet } from 'contexts/WalletContext';
import { ActiveGameLocation, RootLocation } from 'Locations';
import { useGame } from 'hooks/useGame';

const useStyles = createUseStyles({
  content: {
    display: 'flex',
    gap: '114px',
    marginInline: 'auto',
    width: 'fit-content'
  },
  fleetLabel: {
    borderRadius: '3px',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '34.68px',
    paddingBlock: '2px',
    textAlign: 'center'
  }
});

export default function Game(): JSX.Element {
  const { id } = useParams();
  const styles = useStyles();
  const navigate = useNavigate();
  const { address, provider } = useWallet();
  const [gameStatus, setGameStatus] = useState('');
  const [opponentShots, setOpponentShots] = useState<number[]>([]);
  const [isNewGameView, setIsNewGameView] = useState(false);
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);
  const [rotationAxis, setRotationAxis] = useState('y');
  const [selectedShip, setSelectedShip] = useState<Ship>(EMPTY_SHIP);
  const [yourShots, setYourShots] = useState<number[]>([]);
  const { fetching, game } = useGame(!id, id ?? '');

  // const startGame = async () => {
  //   if (!provider) return;
  //   const board: number[][] = [];
  //   placedShips.forEach((ship: Ship) => {
  //     const x = Math.floor(ship.sections[0] / 10);
  //     const y = ship.sections[0] % 10;
  //     const z = ship.orientation === 'x' ? 0 : 1;
  //     board.push([x, y, z]);
  //   });
  //   if (isNewGameView) {
  //     const tx = await createGame(provider, 0, [0, 0], [0, 0], [0, 0], [0, 0]);
  //     await tx.wait();
  //     navigate(ActiveGameLocation('1'));
  //   }
  // };

  const yourTurn = useMemo(() => {}, [game]);

  useEffect(() => {
    if (!fetching) {
      if (!game) {
        navigate(RootLocation);
      } else if (game.status === 'STARTED' && game.startedBy !== address) {
        navigate(RootLocation);
      }
    }
  }, [fetching, id]);

  return (
    <MainLayout>
      {fetching ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className={styles.content}>
            <div style={{ width: '523px' }}>
              <div
                className={styles.fleetLabel}
                style={{ background: '#717C96' }}
              >
                OPPONENT
              </div>
              <OpponentBoard
                shots={yourShots}
                takeShot={setYourShots}
                yourTurn={true}
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
                allPlaced={true}
                opponentShots={opponentShots}
                placedShips={placedShips}
                rotationAxis={''}
                selectedShip={selectedShip}
                setPlacedShip={() => null}
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
