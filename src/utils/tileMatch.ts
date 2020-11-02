import { isAdjacentCoord, isSameCoord, isStraightPath } from './coordUtils';

const getEmptyAdjacentCell = (
  coord: ICoord,
  grid: readonly ICell[][],
  coordHistory: ICoord[]
): ICoord[] => {
  const testCells: ICoord[] = [
    { x: coord.x + 1, y: coord.y },
    { x: coord.x - 1, y: coord.y },
    { x: coord.x, y: coord.y + 1 },
    { x: coord.x, y: coord.y - 1 },
  ];
  return testCells.filter((cell) => {
    if (
      cell.x >= 0 &&
      cell.x < grid.length &&
      cell.y >= 0 &&
      cell.y < grid[0].length
    ) {
      const ignored =
        coordHistory.length > 1
          ? isSameCoord(coordHistory[coordHistory.length - 2], cell)
          : false;
      return grid[cell.x][cell.y].content !== 'tile' && !ignored;
    }
    return false;
  });
};

const tileMatch = (
  coord: { a: ICoord; b: ICoord },
  grid: readonly ICell[][],
  coordHistory: ICoord[] = [coord.a],
  repeats: number = 0,
  turns: number = 0
): ICoord[] | undefined => {
  const MAX_TURN: number = 2;
  if (repeats && repeats > 56) {
    return undefined;
  }
  if (isAdjacentCoord(coord.a, coord.b)) {
    if (
      turns > MAX_TURN ||
      (coordHistory.length > 1 &&
        !isStraightPath(
          coordHistory[coordHistory.length - 2],
          coordHistory[coordHistory.length - 1],
          coord.b
        ) &&
        turns >= MAX_TURN)
    ) {
      return undefined;
    } else {
      return coordHistory;
    }
  }
  if (getEmptyAdjacentCell(coord.b, grid, []).length === 0) {
    return undefined;
  }
  const emptyCells = getEmptyAdjacentCell(coord.a, grid, coordHistory);
  if (emptyCells.length === 0) {
    return undefined;
  } else if (emptyCells.length === 1) {
    let newTurns = turns;
    if (
      coordHistory.length > 1 &&
      !isStraightPath(
        coordHistory[coordHistory.length - 2],
        coordHistory[coordHistory.length - 1],
        emptyCells[0]
      )
    ) {
      newTurns++;
    }
    return tileMatch(
      { a: emptyCells[0], b: coord.b },
      grid,
      [...coordHistory, emptyCells[0]],
      repeats + 1,
      newTurns
    );
  }

  return emptyCells
    .map((cell) => {
      let newTurns = turns;
      if (coordHistory.length > 1) {
        if (
          !isStraightPath(
            coordHistory[coordHistory.length - 2],
            coordHistory[coordHistory.length - 1],
            cell
          )
        ) {
          newTurns++;
        }
      }
      if (newTurns > MAX_TURN) {
        return undefined;
      }

      return tileMatch(
        { a: cell, b: coord.b },
        grid,
        [...coordHistory, cell],
        repeats + 1,
        newTurns
      );
    })
    .find((c) => c);
};
export default tileMatch;
