import battleshipBoardInvalidHoverOne from './battleshipBoardInvalidHoverOne.svg';
import battleshipBoardInvalidHoverTwo from './battleshipBoardInvalidHoverTwo.svg';
import battleshipBoardInvalidHoverThree from './battleshipBoardInvalidHoverThree.svg';
import battleshipBoardPlaced from './battleshipBoardPlaced.svg';
import battleshipBoardValidHover from './battleshipBoardValidHover.svg';
import carrierBoardInvalidHoverOne from './carrierBoardInvalidHoverOne.svg';
import carrierBoardInvalidHoverTwo from './carrierBoardInvalidHoverTwo.svg';
import carrierBoardInvalidHoverThree from './carrierBoardInvalidHoverThree.svg';
import carrierBoardInvalidHoverFour from './carrierBoardInvalidHoverFour.svg';
import carrierBoardPlaced from './carrierBoardPlaced.svg';
import carrierBoardValidHover from './carrierBoardValidHover.svg';
import cruiserBoardInvalidHoverOne from './cruiserBoardInvalidHoverOne.svg';
import cruiserBoardInvalidHoverTwo from './cruiserBoardInvalidHoverTwo.svg';
import cruiserBoardPlaced from './cruiserBoardPlaced.svg';
import cruiserBoardValidHover from './cruiserBoardValidHover.svg';
import destroyerBoardInvalidHoverOne from './destroyerBoardInvalidHoverOne.svg';
import destroyerBoardPlaced from './destroyerBoardPlaced.svg';
import destroyerBoardValidHover from './destroyerBoardValidHover.svg';
import submarineBoardInvalidHoverOne from './submarineBoardInvalidHoverOne.svg';
import submarineBoardInvalidHoverTwo from './submarineBoardInvalidHoverTwo.svg';
import submarineBoardPlaced from './submarineBoardPlaced.svg';
import submarineBoardValidHover from './submarineBoardValidHover.svg';

export const DISPLAY_IMAGES: any = {
    battleship: {
        0: battleshipBoardValidHover,
        1: battleshipBoardInvalidHoverOne,
        2: battleshipBoardInvalidHoverTwo,
        3: battleshipBoardInvalidHoverThree,
        placed: battleshipBoardPlaced
    },
    carrier: {
        0: carrierBoardValidHover,
        1: carrierBoardInvalidHoverOne,
        2: carrierBoardInvalidHoverTwo,
        3: carrierBoardInvalidHoverThree,
        4: carrierBoardInvalidHoverFour,
        placed: carrierBoardPlaced
    },
    cruiser: {
        0: cruiserBoardValidHover,
        1: cruiserBoardInvalidHoverOne,
        2: cruiserBoardInvalidHoverTwo,
        placed: cruiserBoardPlaced
    },
    destroyer: {
        0: destroyerBoardValidHover,
        1: destroyerBoardInvalidHoverOne,
        placed: destroyerBoardPlaced
    },
    submarine: {
        0: submarineBoardValidHover,
        1: submarineBoardInvalidHoverOne,
        2: submarineBoardInvalidHoverTwo,
        placed: submarineBoardPlaced
    }
}