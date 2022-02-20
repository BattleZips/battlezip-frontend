import { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Board from 'components/Board';
import { EMPTY_SHIP, Ship } from 'components/Board/types';
import MainLayout from 'layouts/MainLayout';
import ShipSelection from './components/ShipSelection';
import carrier from 'components/Board/images/carrierSelection.svg';
import battleship from 'components/Board/images/battleshipSelection.svg';
import submarine from 'components/Board/images/submarineSelection.svg';
import cruiser from 'components/Board/images/cruiserSelection.svg';
import destroyer from 'components/Board/images/destroyerSelection.svg';
import { createGame } from 'web3/battleshipGame';
import { useNavigate, useParams } from 'react-router-dom';
import { useWallet } from 'contexts/WalletContext';
import { ActiveGameLocation } from 'Locations';
import { useGame } from 'hooks/useGame';
import { useMiMCSponge } from 'hooks/useMiMCSponge';
import { groth16 } from 'snarkjs';
import { buildProofArgs } from 'utils';

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
  },
  wrapper: {
    outline: 'none'
  }
});

const SHIPS: Ship[] = [
  {
    color: '#8204D6',
    image: carrier,
    name: 'carrier',
    length: 5,
    sections: []
  },
  {
    color: '#1C04D3',
    image: battleship,
    name: 'battleship',
    length: 4,
    sections: []
  },
  {
    color: '#09D1E8',
    image: cruiser,
    name: 'cruiser',
    length: 3,
    sections: []
  },
  {
    color: '#26F207',
    image: submarine,
    name: 'submarine',
    length: 3,
    sections: []
  },
  {
    color: '#EFE707',
    image: destroyer,
    name: 'destroyer',
    length: 2,
    sections: []
  }
];

export default function BuildBoard(): JSX.Element {
  const { id } = useParams();
  const styles = useStyles();
  const navigate = useNavigate();
  const { provider } = useWallet();
  const { mimcSponge } = useMiMCSponge();
  const [shipHash, setShipHash] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);
  const [rotationAxis, setRotationAxis] = useState('y');
  const [selectedShip, setSelectedShip] = useState<Ship>(EMPTY_SHIP);
  const { game } = useGame(!id, id ?? '');

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

  const startGame = async () => {
    if (!provider) return;
    const board: number[][] = [];
    placedShips.forEach((ship: Ship) => {
      const x = Math.floor(ship.sections[0] / 10);
      const y = ship.sections[0] % 10;
      const z = ship.orientation === 'x' ? 0 : 1;
      board.push([x, y, z]);
    });
    debugger
    const _shipHash = await mimcSponge.multiHash(board.flat())
    setShipHash(_shipHash);
    console.log('ship Hash: ', mimcSponge.F.toObject(_shipHash))
    console.log('z', require('zk/board/board_verification_key.json'))

    const { proof, publicSignals } = await groth16.fullProve(
      { ships: board, hash: mimcSponge.F.toObject(_shipHash) },
      'https://ipfs.infura.io/ipfs/QmRt4Uzi5w57fUne4cgPoBdSDJzQhEgHNisnib4iKTQ7Xt',
      'https://ipfs.infura.io/ipfs/Qmaope4n6y4zCSnLDNAHJYnPq1Kdf3yapbRPzGiFd11EUj'
    )
    await groth16.verify(
      require('zk/board/board_verification_key.json'),
      publicSignals,
      proof
    )
    console.log('flag')
    const proofArgs = buildProofArgs(proof)
    console.log('proof: ', proofArgs)
    if (id) {
      // TODO: Join game
    } else {
      // TODO: Fetch game id from event
      // TOOD: Add notification other player has already joined game
      const tx = await createGame(provider, 0, [0, 0], [0, 0], [0, 0], [0, 0]);
      await tx.wait();
      navigate(ActiveGameLocation('1'));
    }
  };

  useEffect(() => {}, [id]);

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
              allPlaced={allPlaced}
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
              allPlaced={allPlaced}
              opponentShots={[]}
              placedShips={placedShips}
              rotationAxis={rotationAxis}
              selectedShip={selectedShip}
              setPlacedShip={handlePlacedShip}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
