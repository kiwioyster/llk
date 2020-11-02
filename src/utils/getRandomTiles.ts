const shuffle = (d: number[]) => {
  return d
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

const getRandomTiles = (initialGrid: ICell[][]): ICell[][] => {
  let partial: number[] = [];
  for (let i = 0; i < 35; ++i) {
    partial[i] = i;
  }

  const rand = shuffle([...partial, ...partial, ...partial, ...partial]);

  return initialGrid.map((row, x) => {
    return row.map((col, y) => {
      if (
        !(
          x === 0 ||
          x === initialGrid.length - 1 ||
          y === 0 ||
          y === row.length - 1
        )
      )
        console.log(rand[y + (x - 1) * 14 - 1], x, y);

      return {
        coord: { x, y },
        content:
          x === 0 ||
          x === initialGrid.length - 1 ||
          y === 0 ||
          y === row.length - 1
            ? undefined
            : 'tile',
        id:
          x === 0 ||
          x === initialGrid.length - 1 ||
          y === 0 ||
          y === row.length - 1
            ? undefined
            : rand[y + (x - 1) * 14 - 1],
      };
    });
  });
};

export default getRandomTiles;
