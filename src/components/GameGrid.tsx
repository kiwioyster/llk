import * as React from 'react';
import { useEffect, useState } from 'react';
import Tile from './Tile';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeTiles } from '../store/actionCreators';
const GridRow = styled.div`
  display: flex;
`;
const GameGrid: React.FC = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState<ICell[][]>([]);
  const [activeTile, setActiveTile] = useState<ICoord>();
  const grids: readonly ICell[][] = useSelector(
    (state: GameState) => state.grid
  );

  const tileClick = (coord: ICoord) => {
    if (!activeTile) {
      setActiveTile(coord);
    } else if (activeTile.x === coord.x && activeTile.y === coord.y) {
      setActiveTile(undefined);
    } else {
      dispatch(
        removeTiles([
          { x: activeTile.x, y: activeTile.y },
          { x: coord.x, y: coord.y },
        ])
      );
      setActiveTile(undefined);
    }
  };

  return (
    <div>
      {grids.map((row) => (
        <GridRow>
          {row.map((col) => {
            const { x, y } = col.coord;
            return col.content ? (
              <Tile
                coord={{ x, y }}
                tileClick={tileClick}
                highlight={activeTile?.x === x && activeTile?.y === y}
              ></Tile>
            ) : (
              <div>
                {col.coord.x}, {col.coord.y}
              </div>
            );
          })}
        </GridRow>
      ))}
    </div>
  );
};

export default GameGrid;
