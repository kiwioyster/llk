import * as React from 'react';
import styled, { css } from 'styled-components';
interface OuterProp {
  highlight: boolean;
}
interface Prop {
  coord: ICoord;
  tileClick: (coord: ICoord) => void;
  highlight?: boolean;
}
const TileBlock = styled.div<OuterProp>`
  background-color: gray;
  width: 50px;
  height: 50px;
  margin: 4px;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5) inset;
  }
  ${(props) =>
    props.highlight &&
    css`
      background-color: green;
    `}
`;
const Tile: React.FC<Prop> = ({ coord, tileClick, highlight }) => {
  const click = () => {
    tileClick(coord);
  };
  return (
    <TileBlock highlight={!!highlight} onClick={click}>
      {coord.x},{coord.y}
    </TileBlock>
  );
};

export default Tile;
