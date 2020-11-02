import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Tile from './Tile';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { highlightTiles, removeTiles } from '../store/actionCreators';
import tileMatch from '../utils/tileMatch';
import Modal from './Modal';
import Score from './Score';
const GridRow = styled.div`
  display: flex;
`;
const GameGrid: React.FC = () => {
  const dispatch = useDispatch();
  // const [grid, setGrid] = useState<ICell[][]>([]);
  const [modal, setModal] = useState<ModalProps>();
  const [activeTile, setActiveTile] = useState<{ coord: ICoord; id: number }>();
  const [addSec, setAddSec] = useState<number>(0);
  const grid: readonly ICell[][] = useSelector(
    (state: GameState) => state.grid
  );
  const timesUpCallback = useCallback(
    () =>
      setModal({
        header: `Time's Up!`,
        type: 'error',
        body: 'Game over',
        btnText: 'Restart',
        btnCallback: () => {
          setModal(undefined);
          window.location.reload();
        },
      }),
    []
  );

  const tileClick = (coord: ICoord, id: number) => {
    if (!activeTile) {
      setActiveTile({ coord, id });
    } else if (
      activeTile.coord.x === coord.x &&
      activeTile.coord.y === coord.y
    ) {
      setActiveTile(undefined);
    } else {
      if (activeTile?.id !== id) {
        setActiveTile(undefined);
        return;
      }
      const path = tileMatch({ a: activeTile.coord, b: coord }, grid);
      if (path) {
        dispatch(
          removeTiles([
            { x: activeTile.coord.x, y: activeTile.coord.y },
            { x: coord.x, y: coord.y },
          ])
        );
        dispatch(highlightTiles([...path, coord]));
        setTimeout(() => {
          dispatch(removeTiles([...path, coord]));
        }, 300);
        setAddSec((prev) => prev + 1);
      }
      setActiveTile(undefined);
    }
  };

  useEffect(() => {
    if (!grid.find((row) => row.find((row) => row.content === 'tile'))) {
      setModal({
        header: 'You Won!',
        type: 'success',
        body: '',
        btnText: 'Restart',
        btnCallback: () => {
          setModal(undefined);
          window.location.reload();
        },
      });
    }
  }, [grid]);

  return (
    <div>
      <Score
        initSec={20}
        timesUpCallback={timesUpCallback}
        addSec={addSec}
      ></Score>
      {grid.map((row) => (
        <GridRow>
          {row.map((col) => {
            const { x, y } = col.coord;
            if (col.content === 'tile' && col.id !== undefined) {
              return (
                <Tile
                  id={col.id}
                  coord={{ x, y }}
                  tileClick={tileClick}
                  highlight={
                    activeTile?.coord.x === x && activeTile?.coord.y === y
                  }
                ></Tile>
              );
            } else if (col.content === 'path') {
              return <div style={{ width: 54, height: 54, margin: 4 }}>+</div>;
            } else {
              return <div style={{ width: 54, height: 54, margin: 4 }}></div>;
            }
          })}
        </GridRow>
      ))}
      {(() => {
        return modal ? (
          <Modal
            type={modal.type}
            header={modal.header}
            body={modal.body}
            btnText={modal.btnText}
            btnCallback={modal.btnCallback}
          ></Modal>
        ) : null;
      })()}
    </div>
  );
};

export default GameGrid;
