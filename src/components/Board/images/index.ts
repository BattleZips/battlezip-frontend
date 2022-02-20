import { ReactComponent as battleshipBoardInvalidHoverOne } from './battleshipBoardInvalidHoverOne.svg';
import { ReactComponent as battleshipBoardInvalidHoverTwo } from './battleshipBoardInvalidHoverTwo.svg';
import { ReactComponent as battleshipBoardInvalidHoverThree } from './battleshipBoardInvalidHoverThree.svg';
// import battleshipBoardPlaced from './battleshipBoardPlaced.svg';
import { ReactComponent as battleshipBoard } from './battleshipBoard.svg';
import { ReactComponent as carrierBoardInvalidHoverOne } from './carrierBoardInvalidHoverOne.svg';
import { ReactComponent as carrierBoardInvalidHoverTwo } from './carrierBoardInvalidHoverTwo.svg';
import { ReactComponent as carrierBoardInvalidHoverThree } from './carrierBoardInvalidHoverThree.svg';
import { ReactComponent as carrierBoardInvalidHoverFour } from './carrierBoardInvalidHoverFour.svg';
// import carrierBoardPlaced from './carrierBoardPlaced.svg';
import { ReactComponent as carrierBoard } from './carrierBoard.svg';
import { ReactComponent as cruiserBoardInvalidHoverOne } from './cruiserBoardInvalidHoverOne.svg';
import { ReactComponent as cruiserBoardInvalidHoverTwo } from './cruiserBoardInvalidHoverTwo.svg';
// import cruiserBoardPlaced from './cruiserBoardPlaced.svg';
import { ReactComponent as cruiserBoard } from './cruiserBoard.svg';
import { ReactComponent as destroyerBoardInvalidHoverOne } from './destroyerBoardInvalidHoverOne.svg';
// import destroyerBoardPlaced from './destroyerBoardPlaced.svg';
import { ReactComponent as destroyerBoard } from './destroyerBoard.svg';
import { ReactComponent as submarineBoardInvalidHoverOne } from './submarineBoardInvalidHoverOne.svg';
import { ReactComponent as submarineBoardInvalidHoverTwo } from './submarineBoardInvalidHoverTwo.svg';
// import submarineBoardPlaced from './submarineBoardPlaced.svg';
import { ReactComponent as submarineBoard } from './submarineBoard.svg';

export const DISPLAY_IMAGES: any = {
  battleship: {
    default: battleshipBoard,
    0: battleshipBoard,
    1: battleshipBoardInvalidHoverOne,
    2: battleshipBoardInvalidHoverTwo,
    3: battleshipBoardInvalidHoverThree
  },
  carrier: {
    default: carrierBoard,
    0: carrierBoard,
    1: carrierBoardInvalidHoverOne,
    2: carrierBoardInvalidHoverTwo,
    3: carrierBoardInvalidHoverThree,
    4: carrierBoardInvalidHoverFour
  },
  cruiser: {
    default: cruiserBoard,
    0: cruiserBoard,
    1: cruiserBoardInvalidHoverOne,
    2: cruiserBoardInvalidHoverTwo
  },
  destroyer: {
    default: destroyerBoard,
    0: destroyerBoard,
    1: destroyerBoardInvalidHoverOne
  },
  submarine: {
    default: submarineBoard,
    0: submarineBoard,
    1: submarineBoardInvalidHoverOne,
    2: submarineBoardInvalidHoverTwo
  }
};
