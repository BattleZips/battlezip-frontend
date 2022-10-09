import { useEffect, useMemo, useState } from 'react';
import { createUseStyles, jss } from 'react-jss';
import { EMPTY_SHIP, Ship } from './types';
import { DISPLAY_IMAGES } from './images';
import { SHIP_STYLES } from './styles';
import hitIcon from './images/hit.svg';
import missIcon from './images/miss.svg';
import { Shot } from 'views/Game/types';

const useStyles = createUseStyles({
  label: {
    alignItems: 'center',
    color: '#9CA3B6',
    display: 'flex',
    fontSize: '24px',
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: '34.68px',
    width: '46px'
  },
  rotateText: {
    fontSize: '24px',
    fontWeight: 400,
    letterSpacing: '3.6px',
    margin: '55px auto 0 auto',
    width: 'fit-content'
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: '7px',
    marginTop: '7px'
  },
  ship: {
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    transformOrigin: 'top left',
    transition: '.2s transform',
    zIndex: 1,
    '& > circle': {
      fill: '#FFFFFF'
    }
  },
  tile: {
    alignItems: 'center',
    background: '#DFF4FF',
    borderRadius: '3px',
    cursor: 'crosshair',
    display: 'flex',
    justifyContent: 'center',
    height: '46px',
    position: 'relative',
    width: '46px'
  },
  wrapper: {
    marginTop: '24px'
  }
});

const BOARD = new Array(10).fill('').map((_) => new Array(10).fill(''));

type BoardProps = {
  allPlaced: boolean;
  opponentShots: Shot[];
  placedShips: Ship[];
  rotationAxis: string;
  selectedShip: Ship;
  setPlacedShip: (ship: Ship) => void;
};

export default function Board({
  allPlaced,
  opponentShots,
  placedShips,
  rotationAxis,
  selectedShip,
  setPlacedShip
}: BoardProps): JSX.Element {
  const styles = useStyles();
  const [highlightedSections, setHighlightedSections] = useState<number[]>([]);
  const [invalidPlacement, setInvalidPlacement] = useState(false);

  /**
   *
   *  Determine path of ship depending on rotational axis.
   *
   * @param index Coordinate of starting section of ship.
   * @param row Row number on the board.
   *
   * @returns Array of spaces to be occupied after ship placement.
   */
  const calculateSections = (index: number, row: number): number[] => {
    const sections: number[] = [];
    for (let i = 0; i < selectedShip.length; i++) {
      const pos = rotationAxis === 'y' ? index + i * 10 : index + i;
      sections.push(pos);
      checkValidPlacement(pos, row, sections);
    }
    return sections;
  };

  const calculateShipWidth = (len: number) => {
    return `${len * 46}px`;
  };

  const checkValidPlacement = (
    pos: number,
    row: number,
    sections: number[]
  ) => {
    const occupied = sections.find((section) => occupiedSpace(section).length);
    if (occupied) {
      setInvalidPlacement(true);
    } else {
      if (rotationAxis === 'y') {
        setInvalidPlacement(pos < 0 || pos > 100);
      } else {
        const rowStart = row * 10;
        const rowEnd = row * 10 + 9;
        const outOfBoundsElement = sections.find(
          (element) => element < rowStart || element > rowEnd
        );
        setInvalidPlacement(!!outOfBoundsElement);
      }
    }
  };

  const circleStyles = (ship: Ship) => {
    const hits: any = ship.sections.map((section, index) => [
      section,
      opponentShots.find((shot) => shot.x + shot.y * 10 === section),
      index + 1
    ]);
    const defaultClass = {
      '& > circle': {
        fill: '#FFFFFF'
      }
    };
    const pseudoClasses = hits
      .filter((hit: any) => hit[1])
      .map((hit: any) => ({
        [`& > circle:nth-of-type(${hit[2]})`]: {
          fill: '#FF0055'
        }
      }));
    const obj = [defaultClass].concat(pseudoClasses).reduce(
      (obj, item) => ({
        ...obj,
        [Object.keys(item)[0]]: Object.values(item)[0]
      }),
      {}
    );
    const sheet = jss
      .createStyleSheet(
        {
          circle: obj
        },
        { link: true }
      )
      .attach();
    return sheet.classes.circle;
  };

  const handleHover = (index: number, row: number) => {
    const sections = calculateSections(index, row);
    if (rotationAxis === 'y') {
      setHighlightedSections(sections.filter((section) => section < 100));
    } else {
      const rowStart = row * 10;
      const rowEnd = rowStart + 9;
      setHighlightedSections(
        sections.filter(
          (section) => !(section > rowEnd) && !(section < rowStart)
        )
      );
    }
  };

  const handleShipPlacement = (index: number, row: number) => {
    const sections = calculateSections(index, row);
    setPlacedShip({
      ...selectedShip,
      orientation: rotationAxis,
      sections
    } as Ship);
    setHighlightedSections([]);
  };

  const invalidSections = useMemo(() => {
    return selectedShip.length - highlightedSections.length;
  }, [highlightedSections, selectedShip]);

  const occupiedSpace = (pos: number): Ship => {
    let placedShip = EMPTY_SHIP;
    placedShips.forEach((ship) => {
      ship.sections.forEach((section) => {
        if (section === pos) {
          placedShip = ship;
          return;
        }
        if (placedShip.name) return;
      });
    });
    return placedShip;
  };

  const shipHeads = useMemo(() => {
    const heads: number[] = [];
    placedShips.forEach((ship) => {
      heads.push(ship.sections[0]);
    });
    return heads;
  }, [placedShips]);

  useEffect(() => {
    if (highlightedSections[0] !== undefined) {
      const row = Math.floor(highlightedSections[0] / 10);
      handleHover(highlightedSections[0], row);
    }
    // eslint-disable-next-line
  }, [rotationAxis]);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.row} style={{ marginLeft: '46px' }}>
          {new Array(10).fill('').map((_, index) => (
            <div className={styles.label} key={index}>
              {String.fromCharCode(65 + index)}
            </div>
          ))}
        </div>
        {BOARD.map((row, rowIndex) => {
          return (
            <div className={styles.row} key={rowIndex}>
              <div className={styles.label}>{rowIndex + 1}</div>
              {row.map((_, colIndex) => {
                const index = rowIndex * 10 + colIndex;
                const containsHead = shipHeads.includes(index);
                const occupied = occupiedSpace(index);
                const HoverImage = selectedShip.length
                  ? DISPLAY_IMAGES[selectedShip.name][invalidSections]
                  : undefined;
                const PlacedImage = occupied.length
                  ? DISPLAY_IMAGES[occupied.name].default
                  : undefined;
                const shot = opponentShots.find(
                  (shot) => shot.x + shot.y * 10 === index
                );
                const hit = shot && occupied.length;
                const validPlacement =
                  !occupied.length && !invalidPlacement && selectedShip.name;
                const yOrinetation = rotationAxis === 'y';
                return (
                  <div
                    className={styles.tile}
                    key={index}
                    onClick={() =>
                      validPlacement && handleShipPlacement(index, rowIndex)
                    }
                    onMouseOver={() =>
                      !allPlaced && handleHover(index, rowIndex)
                    }
                    onMouseLeave={() =>
                      !allPlaced && setHighlightedSections([])
                    }
                  >
                    {shot && !occupied.length && (
                      <img
                        alt={hit ? 'Hit' : 'Miss'}
                        src={hit ? hitIcon : missIcon}
                      />
                    )}
                    {PlacedImage && containsHead && (
                      <PlacedImage
                        className={`${styles.ship} ${circleStyles(occupied)}`}
                        style={{
                          fill: '#000000',
                          transform:
                            occupied.orientation === 'y'
                              ? `rotate(90deg) translateY(-${
                                  SHIP_STYLES[occupied.name].translate
                                }px)`
                              : 'rotate(0deg)',
                          width: calculateShipWidth(occupied.length)
                        }}
                      />
                    )}
                    {HoverImage && highlightedSections[0] === index && (
                      <HoverImage
                        className={styles.ship}
                        style={{
                          fill: validPlacement ? '#717C96' : '#FF0055',
                          transform: yOrinetation
                            ? `rotate(90deg) translateY(-${
                                SHIP_STYLES[selectedShip.name].translate
                              }px)`
                            : 'rotate(0deg)',
                          width: calculateShipWidth(highlightedSections.length),
                          zIndex: 2
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {!allPlaced && (
        <div className={styles.rotateText}>[PRESS THE SPACE BAR TO ROTATE]</div>
      )}
    </div>
  );
}
