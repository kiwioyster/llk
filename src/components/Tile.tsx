import * as React from 'react';
import styled, { css } from 'styled-components';
interface OuterProp {
  highlight: boolean;
}
interface Prop {
  coord: ICoord;
  id: number;
  tileClick: (coord: ICoord, id: number) => void;
  highlight?: boolean;
}
const TileBlock = styled.div<OuterProp>`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: gray;
  width: 54px;
  height: 54px;
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
  & img {
    height: 50px;
    width: 50px;
    margin: auto;
  }
`;
const Tile: React.FC<Prop> = ({ id, coord, tileClick, highlight }) => {
  const click = () => {
    tileClick(coord, id);
  };
  return (
    <TileBlock highlight={!!highlight} onClick={click}>
      <img alt={'tile pic'} src={require(`../assets/${id}.png`)} />
    </TileBlock>
  );
};

export default Tile;
