export const isAdjacentCoord = (a: ICoord, b: ICoord): boolean => {
  const testCells: ICoord[] = [
    { x: a.x + 1, y: a.y },
    { x: a.x - 1, y: a.y },
    { x: a.x, y: a.y + 1 },
    { x: a.x, y: a.y - 1 },
  ];
  return !!testCells.find((cell) => isSameCoord(cell, b));
};

export const isSameCoord = (a: ICoord, b: ICoord): boolean => {
  return a.x === b.x && a.y === b.y;
};

export const isStraightPath = (a: ICoord, b: ICoord, c: ICoord): boolean => {
  return (a.x === b.x && b.x === c.x) || (a.y === b.y && b.y === c.y);
};
