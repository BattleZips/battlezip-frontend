import { CSSProperties, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Ship } from '../types';

const useStyles = createUseStyles({
  section: {
    border: '1px solid #848484',
    cursor: 'crosshair',
    height: '50px',
    width: '50px',
  },
  row: {
    display: 'flex',
  },
});

const BOARD = new Array(10).fill('').map((_) => new Array(10).fill(''));

const CORNER_STYLES: { [key: number]: CSSProperties } = {
  0: {
    borderTopLeftRadius: '16px',
  },
  9: {
    borderTopRightRadius: '16px',
  },
  90: {
    borderBottomLeftRadius: '16px',
  },
  99: {
    borderBottomRightRadius: '16px',
  },
};

type BoardProps = {
  placedShips: Ship[];
  rotationAxis: string;
  selectedShip: Ship;
  setPlacedShip: (ship: Ship) => void;
};

export default function Board({
  placedShips,
  rotationAxis,
  selectedShip,
  setPlacedShip,
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

  const checkValidPlacement = (
    pos: number,
    row: number,
    sections: number[]
  ) => {
    const occupied = sections.find(
      (section) => occupiedSpace(section).occupied
    );
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

  const determineHighlightColor = (
    index: number,
    occupied: boolean,
    shipColor: string
  ): string => {
    if (invalidPlacement && highlightedSections.includes(index)) {
      return '#FF5151';
    } else if (occupied) {
      return shipColor;
    } else {
      return highlightedSections.includes(index) ? '#606060' : '#C9C9C9';
    }
  };

  const handleHover = (index: number, row: number) => {
    const sections = calculateSections(index, row);
    if (rotationAxis === 'y') {
      setHighlightedSections(sections);
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
      sections,
    } as Ship);
  };

  const occupiedSpace = (
    pos: number
  ): { occupied: boolean; shipColor: string } => {
    let occupied = false;
    let shipColor = '';
    placedShips.forEach((ship) => {
      ship.sections.forEach((section) => {
        if (section === pos) {
          occupied = true;
          shipColor = ship.color;
          return;
        }
        if (occupied) return;
      });
    });
    return { occupied, shipColor };
  };

  useEffect(() => {
    if (highlightedSections[0] !== undefined) {
      const row = Math.floor(highlightedSections[0] / 10);
      handleHover(highlightedSections[0], row);
    }
    // eslint-disable-next-line
  }, [rotationAxis]);

  return (
    <div>
      {BOARD.map((row, rowIndex) => (
        <div className={styles.row}>
          {row.map((_, colIndex) => {
            const index = rowIndex * 10 + colIndex;
            const { occupied, shipColor } = occupiedSpace(index);
            const validPlacement =
              !occupied && !invalidPlacement && selectedShip.name;
            return (
              <div
                className={styles.section}
                onClick={() =>
                  validPlacement && handleShipPlacement(index, rowIndex)
                }
                onMouseOver={() => handleHover(index, rowIndex)}
                style={{
                  background: determineHighlightColor(
                    index,
                    occupied,
                    shipColor
                  ),
                  ...CORNER_STYLES[index],
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
