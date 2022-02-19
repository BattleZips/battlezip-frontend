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
import GameSkeleton from './components/GameSkeleton';

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
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);
  const [yourShots, setYourShots] = useState<number[]>([]);
  const { fetching, game } = useGame(id ?? '');

  const restoreBoardState = () => {
    const storedBoard = localStorage.getItem('BOARD_STATE');
    if (storedBoard) {
      setPlacedShips(JSON.parse(storedBoard));
    }
  };

  const yourTurn = useMemo(() => {}, [game]);

  useEffect(() => {
    if (!fetching) {
      if (game) {
        const historic = game.status === 'OVER';
        const inGame = game.startedBy === address || game.joinedBy === address;
        if (!historic && !inGame) {
          navigate(RootLocation);
        } else {
          restoreBoardState();
        }
      } else {
        navigate(RootLocation);
      }
    }
  }, [fetching, id]);

  return (
    <MainLayout>
      {fetching ? (
        <GameSkeleton />
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
                selectedShip={{} as Ship}
                setPlacedShip={() => null}
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
